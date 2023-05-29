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
      console.log('Inside fetchRoomName')
      const roomId = roomDetails.id;
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      const unsubscribe = listenMessages({isCurrentUserKurator, pathToMessages, setMessages, messageLimit, setLoadingMessages});
      setRoomId(roomId);
      console.log('End of fetcRoomName');
      return unsubscribe;
    });
  };

export default getRefPath;
