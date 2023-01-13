import firestore from '@react-native-firebase/firestore';

const roomName = async ({clientUserId}) => {

  const t0 = performance.now();

  const getRoomName = await firestore()
    .collection('rooms')
    .where('users.client.uid', '==', clientUserId)
    .get();

  const t1 = performance.now();
  console.log('TIME', t1-t0);

   return getRoomName;
};

export default roomName;
