import firestore from '@react-native-firebase/firestore';
import ListenMsg from './listenMsg';

const getRefPath = ({
  isCurrentUserKurator,
  setRefPath,
  fetchRoomName,
  setMessages,
  messageLimit,
  setRoomId,
  loadingMessages,
  setLoadingMessages
}) => {
    console.log('getRefPath - loadingMessages', loadingMessages);
    return fetchRoomName.docs.map(roomDetails => {
      const roomId = roomDetails.id;
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      const unsubscribe = ListenMsg({isCurrentUserKurator, pathToMessages, setMessages, messageLimit, loadingMessages, setLoadingMessages});
      setRoomId(roomId);
      return unsubscribe;
    });
  };

export default getRefPath;
