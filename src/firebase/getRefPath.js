import firestore from '@react-native-firebase/firestore';
import ListenMsg from './listenMsg';

const getRefPath = ({
  isKurator,
  setRefPath,
  rumNamn,
  setMessages,
  msgLimit,
  setRoomId,
}) => {
    console.log('getRefPath');
    return rumNamn.docs.map(roomDetails => {
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      const unsubscribe = ListenMsg({isKurator, pathToMessages, setMessages, msgLimit});
      setRoomId(roomId);
      return unsubscribe;
    });
  };

export default getRefPath;
