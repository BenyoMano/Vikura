import firestore from '@react-native-firebase/firestore';
import listenMessages from './listenMessage';

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
    return fetchRoomName.docs.map(roomDetails => {
      const roomId = roomDetails.id;
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      const unsubscribe = listenMessages({isCurrentUserKurator, pathToMessages, setMessages, messageLimit, loadingMessages, setLoadingMessages});
      setRoomId(roomId);
      return unsubscribe;
    });
  };

export default getRefPath;
