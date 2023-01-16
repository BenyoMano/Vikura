import firestore from '@react-native-firebase/firestore';
import listenMsg from './listenMsg';


const getRefPath = ({setRefPath, rumNamn, setMessages}) => {
  const newRefPath = () => {
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
  newRefPath();
};

export default getRefPath;
