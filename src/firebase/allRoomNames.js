import firestore from '@react-native-firebase/firestore';

const allRoomNames = async () => {

  const getAllRoomNames = await firestore()
  .collection('rooms')
  .where('users.client.id', '!=', '')
  .get();

   return getAllRoomNames;
};

export default allRoomNames;