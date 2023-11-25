import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

const getRoomName = async ({clientUserId}) => {
  try {
    const roomName = await firestore()
      .collection('rooms')
      .where('users.client.id', '==', clientUserId)
      .get();
    return roomName?.docs[0];
  } catch (error) {
    useGeneralErrorHandling({error, position: 'top'});
    return;
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
