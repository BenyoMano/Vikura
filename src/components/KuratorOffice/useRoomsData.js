import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const useRoomsData = ({setIsLoaded}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let unsubscribeFromAllRoomNames;
    const fetchRooms = async () => {
      unsubscribeFromAllRoomNames = firestore()
        .collection('rooms')
        .where('users.client.id', '!=', '')
        .onSnapshot(roomNames => {
          const newRooms = roomNames.docs.map(roomDoc => {
            const {alias: clientAlias, id: clientId} =
              roomDoc.data().users.client;
            const latestTimestamp = roomDoc.data().latestTimestamp;
            const roomId = roomDoc.id;
            return {roomId, clientAlias, clientId, latestTimestamp};
          });
          setRooms(newRooms);
        });
      setIsLoaded(true);
    };
    fetchRooms();
    return () => unsubscribeFromAllRoomNames();
  }, []);

  return rooms;
};
