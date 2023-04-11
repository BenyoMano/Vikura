import { useState, useEffect } from 'react';
import allRoomNames from '../../firebase/allRoomNames';

export const useRooms = ({setIsLoaded}) => {

    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        const getRooms = async () => {
            const roomNames = await allRoomNames();
            const newRooms = roomNames.docs.map(room=>{
                const clientAlias = room.data().users.client.alias;
                const clientId = room.data().users.client.id;
                const splitRefPath = room.ref.path.split('/');
                const roomId = splitRefPath[splitRefPath.length - 1];
                return {roomId, clientAlias, clientId}
            });
            setRooms(newRooms);
            setIsLoaded(true);
        }
        getRooms()
    }, [])

    return rooms;

}