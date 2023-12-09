import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

type RoomNameProps = {
  clientUserId: string;
};

const getRoomName = async ({clientUserId}: RoomNameProps) => {
  let roomName:
    | FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    | undefined;
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
