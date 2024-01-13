import {useState, useEffect} from 'react';
import roomName from '../../../firebase/roomName';

type MessagesProps = {
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  clientUserId: string;
};

type Messages = {
  timestamp: string;
  roomId: string;
};

export const useMessages = ({setRoomId, clientUserId}: MessagesProps) => {
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const rumNamn = await roomName({clientUserId});
      const newMessage = rumNamn?.docs.map(roomDetails => {
        const timestamp = roomDetails.data().timestamp.toMillis();
        const splitRefPath = roomDetails.ref.path.split('/');
        const roomId = splitRefPath[splitRefPath.length - 1];
        return {timestamp, roomId};
      });
      const {roomId} = newMessage; //
      setMessages(newMessage);
      setRoomId(roomId);
    };
    getMessages();
  }, []);
  return messages;
};
