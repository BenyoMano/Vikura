import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const createRoom = async ({userId}) => {
  const roomRef = firestore().collection('rooms');

  await roomRef.add({
    users: {
      client: {
        alias: '',
        id: userId,
      },
    },
  });
};

export default createRoom;
