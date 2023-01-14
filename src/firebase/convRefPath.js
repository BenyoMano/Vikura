import firestore from '@react-native-firebase/firestore';
import listenConv from './listenConv';


const convRefPath = ({newConvos, setRefPath, rumNamn, setConvos}) => {
  const getRefPath = () => {

    rumNamn.docs.map(roomDetails => {
      const clientAlias = roomDetails.data().users.client.alias;
      const clientId = roomDetails.data().users.client.id;
      console.log('Client alias:', clientAlias);
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');
  
      setRefPath(pathToMessages);

      listenConv({pathToMessages, setConvos, newConvos, clientId, clientAlias})
    });

  };
  getRefPath();
};

export default convRefPath;
