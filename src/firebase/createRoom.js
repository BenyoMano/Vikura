import firestore from '@react-native-firebase/firestore';

const createRoom = async () => {
  const roomRef = firestore().collection('rooms');
  console.log('Creating room');
  const getAlias = await firestore()
    .collection('Users')
    .doc(clientUserId)
    .get();

  await roomRef.add({
    users: {
      client: {
        alias: getAlias.get('alias'),
        uid: clientUserId,
      },
    },
  });
  getRefPath(getRoomName);
};

export default createRoom;
