import firestore from '@react-native-firebase/firestore';
import ListenMsg from './listenMsg';

const getRefPath = ({
  isCurrentUserKurator,
  setRefPath,
  rumNamn,
  setMessages,
  messageLimit,
  setRoomId,
}) => {
    console.log('getRefPath');
    return rumNamn.docs.map(roomDetails => {
      const roomId = roomDetails.id;
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      const unsubscribe = ListenMsg({isCurrentUserKurator, pathToMessages, setMessages, messageLimit});
      setRoomId(roomId);
      return unsubscribe;
    });
  };

export default getRefPath;
