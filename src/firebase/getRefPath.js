import firestore from '@react-native-firebase/firestore';
import listenMsg from './listenMsg';


const getRefPath = ({isKurator, setRefPath, rumNamn, setMessages, msgLimit}) => {
  const newRefPath = async () => {
    rumNamn.docs.map(roomDetails => {
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      setRefPath(pathToMessages);
      listenMsg({isKurator, pathToMessages, setMessages, msgLimit});
     
    });
  };
  newRefPath();
};

export default getRefPath;
