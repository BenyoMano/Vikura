import firestore from '@react-native-firebase/firestore';
import listenMsg from './listenMsg';


const refPath = ({setRefPath, rumNamn, setMessages}) => {
  const getRefPath = () => {
    rumNamn.docs.map(roomDetails => {
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      listenMsg({pathToMessages, setMessages});

    });
  };
  getRefPath();
};

export default refPath;
