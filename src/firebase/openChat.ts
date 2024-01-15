import {useContext, useState, useEffect} from 'react';
import {IsCurrentUserKuratorContext} from './isCurrentUserKuratorContext';
import firestore from '@react-native-firebase/firestore';
import {useRoomId} from './useRoomId';

export type Message = {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  displayTimestamp: Date;
};

type UseOpenChatProps = {
  messageLimit: number;
  clientUserId: string;
};

type UseOpenChatResult = {
  messages: Message[];
  isLoading: boolean;
};

const useOpenChat = ({
  messageLimit,
  clientUserId,
}: UseOpenChatProps): UseOpenChatResult => {
  const contextValue = useContext(IsCurrentUserKuratorContext);
  const isCurrentUserKurator = contextValue?.isCurrentUserKurator;
  const [isLoading, setIsLoading] = useState(false);
  const roomId = useRoomId(clientUserId);
  const [messages, setMessages] = useState<Message[]>([]);

  const sortedMessages = (messages: Message[]) => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  };

  const handleSnapshot = (messageDetails: any) => {
    const newMessages = messageDetails.docs.map((documentSnapshot: any) => ({
      id: documentSnapshot.data().id,
      text: documentSnapshot.data().msg,
      author: documentSnapshot.data().author,
      timestamp: documentSnapshot.data().timestamp.toMillis(),
      displayTimestamp: documentSnapshot.data().timestamp.toDate(),
    }));

    setMessages(sortedMessages(newMessages));
    setIsLoading(false);
  };

  const listenForMessages = async (messageLimit: number) => {
    setIsLoading(true);

    if (isCurrentUserKurator === undefined) {
      return;
    }

    if (!roomId) {
      return;
    }

    const pathToMessages = firestore().collection('rooms').doc(roomId);

    const unsubscribe = pathToMessages
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(30 + messageLimit)
      .onSnapshot(handleSnapshot, error => {
        console.error('messageDetails', error);
      });

    if (isCurrentUserKurator) {
      pathToMessages.update({
        'latestMessage.isRead': true,
      });
    }

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = listenForMessages(messageLimit);
    return () => {
      const unsubscribeToListener = async () => {
        const awaitedUnsubscribe = await unsubscribe;
        if (awaitedUnsubscribe === undefined) return;
        awaitedUnsubscribe();
      };
      unsubscribeToListener();
    };
  }, [messageLimit, roomId, isCurrentUserKurator]);

  return {messages, isLoading};
};

export default useOpenChat;
