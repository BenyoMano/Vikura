import { useState, useEffect } from 'react';
import getAllRoomNames from '../../firebase/getAllRoomNames';

export const useRoomsData = ({setIsLoaded}) => {

    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        const fetchRooms = async () => {
            const roomNamesSnapshot = await getAllRoomNames();
            const newRooms = roomNamesSnapshot.docs.map(roomDoc=>{
                const {alias: clientAlias, id: clientId} = roomDoc.data().users.client;
                const latestTimestamp = roomDoc.data().latestTimestamp;
                const roomId = roomDoc.id;
                return {roomId, clientAlias, clientId, latestTimestamp}
            });
            setRooms(newRooms);
            setIsLoaded(true);
        }
        fetchRooms()
    }, [])

    return rooms;

}