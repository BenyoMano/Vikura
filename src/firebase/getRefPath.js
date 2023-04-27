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
  const newRefPath = async () => {
    console.log('getRefPath');
    rumNamn.docs.map(roomDetails => {
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      ListenMsg({isKurator, pathToMessages, setMessages, msgLimit});
      setRoomId(roomId);
    });
  };
  newRefPath();
};

export default getRefPath;
