import firestore from '@react-native-firebase/firestore';

const createRoom = async ({clientUserId}) => {
  const roomRef = firestore().collection('rooms');
  const getAlias = await firestore()
    .collection('Users')
    .doc(clientUserId)
    .get();

  await roomRef.add({
    users: {
      client: {
        alias: getAlias.get('alias'),
        id: clientUserId,
      },
    },
  });
};

export default createRoom;
