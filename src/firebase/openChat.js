import { useContext, useState, useEffect } from "react";
import { IsCurrentUserKuratorContext } from "./isCurrentUserKuratorContext";
import firestore from "@react-native-firebase/firestore";
import { useRoomId } from "./useRoomId";

const useOpenChat = ({ messageLimit, clientUserId }) => {
  const { isCurrentUserKurator } = useContext(IsCurrentUserKuratorContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const roomId = useRoomId(clientUserId);
  console.log('useOpenChat - roomId', roomId);

  const handleSnapshot = (messageDetails) => {
    console.log('Inside handleSnapshot');
    const newMessages = messageDetails.docs.map((documentSnapshot) => ({
      timestamp: documentSnapshot.data().timestamp.toMillis(),
      displayTimestamp: documentSnapshot.data().timestamp.toDate(),
      text: documentSnapshot.data().msg,
      isRead: documentSnapshot.data().isRead,
      author: documentSnapshot.data().author,
      id: documentSnapshot.data().id,
    }));

    setMessages(newMessages);
    setIsLoading(false);
  };

  const listenForMessages = async (messageLimit) => {
    setIsLoading(true);
    
    if (isCurrentUserKurator === undefined) {
      return;
    }
    
    if (!roomId) {
      return;
    }
    console.log('Inside listenForMessages', isCurrentUserKurator, roomId);

    const pathToMessages = firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages");

    const unsubscribe = pathToMessages
      .orderBy("timestamp", "desc")
      .limit(30 + messageLimit)
      .onSnapshot(handleSnapshot);

    if (isCurrentUserKurator) {
      pathToMessages
        .where("isRead", "==", false)
        .get()
        .then((a) => {
          a.forEach((doc) => {
            doc.ref.update({
              isRead: true,
            });
          });
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

  return { messages, isLoading };
};

export default useOpenChat;
