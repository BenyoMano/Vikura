import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const roomName = async ({clientUserId}) => {
  console.log('Inside roomName');
  let getRoomName;
  try {
    getRoomName = await firestore()
    .collection('rooms')
    .where('users.client.id', '==', clientUserId)
    .get();
    console.log('try getRoomName');
  } catch (error) {
    showMessage({
      message: 'Varning!',
      description: String(error),
      type: 'danger',
      duration: 3200,
    });
  }
  console.log('Before return roomName');
  return getRoomName;
  
};

export default roomName;
