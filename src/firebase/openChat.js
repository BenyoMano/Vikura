import firestore from '@react-native-firebase/firestore';
import createRoom from './createRoom';
import listenMsg from './listenMsg';
import refPath from './refPath';
import roomName from './roomName';

const openChat = async ({user, clientUserId}) => {
  const isKurator = await firestore().collection('Users').doc(user.uid).get();

  if (isKurator.get('kurator') == true) {
    console.log('Client UserId', clientUserId); //clientUserId
    roomName();
    refPath();
    listenMsg();
  } else {
    clientUserId = user.uid;
    roomName();
    console.log('Room name', roomName.empty);
    //console.log('Room name', getRoomName.empty);

    if (!roomName.empty) {
      refPath();
      listenMsg();
    } else {
      console.log('Room does not exist!');
      createRoom();
    }
  }
};

export default openChat;
