import {useState, useCallback, SetStateAction} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export type RoomData = {
  roomId: string;
  clientAlias: string;
  clientId: string;
  latestTimestamp?: any;
};

type useRoomsDataProps = {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
};

export const useRoomsData = ({setIsLoaded}: useRoomsDataProps): RoomData[] => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromAllRoomNames: () => void;
      const fetchRooms = async () => {
        unsubscribeFromAllRoomNames = firestore()
          .collection('rooms')
          .where('users.client.id', '!=', '')
          .onSnapshot(
            roomNames => {
              const newRooms = roomNames.docs.map(roomDoc => {
                const {alias, id} = roomDoc.data().users.client;
                const clientAlias: string = alias;
                const clientId: string = id;
                const latestTimestamp: any = roomDoc.data().latestTimestamp;
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
