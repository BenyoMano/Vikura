import firestore from '@react-native-firebase/firestore';

const getAllRoomNames = async () => {

  const fetchAllRoomNames = await firestore()
  .collection('rooms')
  .where('users.client.id', '!=', '')
  .get();

   return fetchAllRoomNames;
};

export default getAllRoomNames;