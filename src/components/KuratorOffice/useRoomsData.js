import {useState, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export const useRoomsData = ({setIsLoaded}) => {
  const [rooms, setRooms] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromAllRoomNames;
      const fetchRooms = async () => {
        unsubscribeFromAllRoomNames = firestore()
          .collection('rooms')
          .where('users.client.id', '!=', '')
          .onSnapshot(
            roomNames => {
              const newRooms = roomNames.docs.map(roomDoc => {
                const {alias: clientAlias, id: clientId} =
                  roomDoc.data().users.client;
                const latestTimestamp = roomDoc.data().latestTimestamp;
                const roomId = roomDoc.id;
                return {roomId, clientAlias, clientId, latestTimestamp};
              });
              setRooms(newRooms);
            },
            error => {
              console.error('roomNames:', error);
            },
          );
        setIsLoaded(true);
      };
      fetchRooms();

      return () => {
        unsubscribeFromAllRoomNames();
      };
    }, []),
  );

  return rooms;
};
