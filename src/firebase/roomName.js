import firestore from '@react-native-firebase/firestore';

const roomName = async ({clientUserId}) => {
  console.log('roomName clientId', clientUserId);
  const getRoomName = await firestore()
    .collection('rooms')
    .where('users.client.id', '==', clientUserId)
    .get();

   return getRoomName;
};

export default roomName;
