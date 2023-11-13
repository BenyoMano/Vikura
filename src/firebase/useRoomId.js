import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const getRoomName = async ({clientUserId}) => {
  try {
    const roomName = await firestore()
      .collection('rooms')
      .where('users.client.id', '==', clientUserId)
      .get();
    return roomName?.docs[0];
  } catch (error) {
    showMessage({
      message: 'Varning!',
      description: String(error),
      type: 'danger',
      autoHide: false,
    });
  }
};

export const useRoomId = clientUserId => {
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomName = await getRoomName({clientUserId});
      const newRoomId = roomName?.id;
      setRoomId(newRoomId);
    };

    fetchRoom();
  }, [clientUserId, roomId]);
  return roomId;
};
