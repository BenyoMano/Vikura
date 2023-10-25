import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const createRoom = async ({userId}) => {
  console.log('UserId', userId);
  const roomRef = firestore().collection('rooms');

  try {
    await roomRef.add({
      users: {
        client: {
          alias: '',
          id: userId,
        },
      },
    });
    console.log('After roomRef add');
  } catch (error) {
    showMessage({
      message: 'Varning!',
      description: String(error),
      type: 'danger',
      duration: 3200,
    });
  }
};

export default createRoom;
