import firestore from '@react-native-firebase/firestore';

const updateRoomAlias = async ({alias, userId}) => {
  const room = await firestore()
    .collection('rooms')
    .where('users.client.id', '==', userId)
    .get();
  const roomId = room?.docs[0].id;

  try {
    await firestore().collection('rooms').doc(roomId).update({
      'users.client.alias': alias,
    });
  } catch (error) {
    console.error('updateRoomAlias error: ', error);
  }
};

export default updateRoomAlias;
