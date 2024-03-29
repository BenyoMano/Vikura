import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

const getRoomName = async (clientUserId: string) => {
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

export const useRoomId = (clientUserId: string) => {
  const [roomId, setRoomId] = useState<string>();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomName = await getRoomName(clientUserId);
      const newRoomId = roomName?.id;
      setRoomId(newRoomId);
    };

    fetchRoom();
  }, [clientUserId, roomId]);
  return roomId;
};
