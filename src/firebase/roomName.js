import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

const getRoomName = async ({clientUserId}) => {
  let roomName;
  try {
    roomName = await firestore()
      .collection('rooms')
      .where('users.client.id', '==', clientUserId)
      .get();
  } catch (error) {
    useGeneralErrorHandling({error, position: 'top'});
  }
  return roomName?.docs[0];
};

export default getRoomName;
