import firestore from '@react-native-firebase/firestore';

const createRoom = async ({userId}) => {
  const roomRef = firestore().collection('rooms');

  await roomRef.add({
    users: {
      client: {
        alias: '',
        id: userId,
      },
    },
  });
};

export default createRoom;
