import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const createRoom = async ({userId}) => {
  const roomRef = firestore().collection('rooms');
  const getAlias = await firestore()
    .collection('Users')
    .doc(userId)
    .get();

  try {
    await roomRef.add({
      users: {
        client: {
          alias: getAlias.get('alias'),
          id: userId,
        },
      },
    });
    showMessage({
      message: 'Välkommen!',
      description: 'Du kan börja chatta direkt!',
      type: 'info',
      position: 'center',
      floating: true,
      duration: 3000,
    });
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
