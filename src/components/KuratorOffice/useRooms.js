import { useState, useEffect } from 'react';
import allRoomNames from './allRoomNames';

export const useRooms = () => {

    const [convos, setConvos] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        const getRooms = async () => {
            const roomIds = await allRoomNames().map(room=>{
                const splitRefPath = room.ref.path.split('/');
                return splitRefPath[splitRefPath.length - 1];
            });

            setRooms(roomNames);

            // roomNames.docs.map(roomDetails => {
            //     const clientAlias = roomDetails.data().users.client.alias;
            //     const clientId = roomDetails.data().users.client.id;
            //     const splitRefPath = roomDetails.ref.path.split('/');
            //     const roomId = splitRefPath[splitRefPath.length - 1];
                
            //     const pathToMessages = firestore()
            //       .collection('rooms')
            //       .doc(roomId)
            //       .collection('messages');
            
            //       pathToMessages
            //       .orderBy('timestamp', 'desc')
            //       .limit(1)
            //       .onSnapshot(lastMessage => {
            //         lastMessage.docs.forEach(lastMessageDetails => {
            //           setConvos([...convos.filter(convos=>convos.roomId !== roomId), {  
            //             roomId,
            //             timestamp: lastMessageDetails.data().timestamp.toMillis(),
            //             displayTimestamp: lastMessageDetails.data().timestamp.toDate(), 
            //             text: lastMessageDetails.data().msg,
            //             isRead: lastMessageDetails.data().isRead,
            //             alias: clientAlias,
            //             id: clientId,
            //           }]);
            //         });
            //       });
            //     });

        }

        getRooms()
    })

    return convos;

}