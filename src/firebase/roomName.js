import firestore from '@react-native-firebase/firestore';

const roomName = ({clientUserId}) => {
  const getRoomName = async () => {
    const getRoomName = await firestore()
      .collection('rooms')
      .where('users.client.uid', '==', clientUserId)
      .get();
  };
  getRoomName();
};

export default roomName;
