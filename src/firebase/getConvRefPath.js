import firestore from '@react-native-firebase/firestore';
import listenConv from './listenConv';


const getConvRefPath = ({newConvos, setConvRefPath, rumNamn, setConvos}) => {
  const getRefPath = () => {

    rumNamn.docs.map(roomDetails => {
      const clientAlias = roomDetails.data().users.client.alias;
      const clientId = roomDetails.data().users.client.id;
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');
  
      setConvRefPath(pathToMessages);

      listenConv({pathToMessages, setConvos, newConvos, clientId, clientAlias})
    });

  };
  getRefPath();
};

export default getConvRefPath;