import {useState, useCallback, SetStateAction} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export type RoomData = {
  roomId: string;
  clientAlias: string;
  clientId: string;
  isRead?: boolean;
  text?: string;
  timestamp?: any;
};

type useRoomsDataProps = {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
  searchString: string;
};

export const useRoomsData = ({setIsLoaded, searchString}: useRoomsDataProps): RoomData[] => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  const sortRooms = (rooms: RoomData[]) => {
    return rooms.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  };

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromAllRoomNames: () => void;
      const fetchRooms = async () => {
        unsubscribeFromAllRoomNames = firestore()
          .collection('rooms')
          .where('users.client.alias', '>=', searchString)
          .where('users.client.alias', '<=', searchString + '\uf8ff')
          .onSnapshot(
            roomNames => {
              const newRooms = roomNames.docs.map(roomDoc => {
                const {alias, id} = roomDoc.data().users.client;
                const clientAlias: string = alias;
                const clientId: string = id;
                const roomId = roomDoc.id;
                const latestMessage = roomDoc.data().latestMessage;
                let timestamp, isRead, text;
                if (latestMessage) {
                  isRead = latestMessage.isRead;
                  text = latestMessage.text;
                  timestamp = latestMessage.timestamp.toDate();
                }
                return {
                  roomId,
                  clientAlias,
                  clientId,
                  isRead,
                  text,
                  timestamp,
                };
              });
              setRooms(sortRooms(newRooms));
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
    }, [searchString]),
  );

  return rooms;
};
