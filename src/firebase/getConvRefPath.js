import firestore from '@react-native-firebase/firestore';
import listenConv from './listenConv';


const getConvRefPath = ({newConvos, roomNames, setConvos, setIsLoaded}) => {
  const getRefPath = () => {
    roomNames.docs.map(roomDetails => {
      const clientAlias = roomDetails.data().users.client.alias;
      const clientId = roomDetails.data().users.client.id;
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');
  
      listenConv({newConvos, pathToMessages, setConvos, clientId, clientAlias, setIsLoaded})
    });
  };
  getRefPath();
};

export default getConvRefPath;