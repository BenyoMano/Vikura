import { useState, useEffect } from 'react';
import allRoomNames from '../../firebase/allRoomNames';
import firestore from '@react-native-firebase/firestore';

export const useConvos = () => {

    const [convos, setConvos] = useState([]);

    useEffect(()=>{
        const getConvos = async () => {
            const roomNames = await allRoomNames();
            
            roomNames.docs.map(roomDetails => {
                const clientAlias = roomDetails.data().users.client.alias;
                const clientId = roomDetails.data().users.client.id;
                const splitRefPath = roomDetails.ref.path.split('/');
                const roomId = splitRefPath[splitRefPath.length - 1];
                
                const pathToMessages = firestore()
                  .collection('rooms')
                  .doc(roomId)
                  .collection('messages');
            
                  pathToMessages
                  .orderBy('timestamp', 'desc')
                  .limit(1)
                  .onSnapshot(lastMessage => {
                    lastMessage.docs.forEach(lastMessageDetails => {
                      setConvos([...convos.filter(convos=>convos.roomId !== roomId), {  
                        roomId,
                        timestamp: lastMessageDetails.data().timestamp.toMillis(),
                        displayTimestamp: lastMessageDetails.data().timestamp.toDate(), 
                        text: lastMessageDetails.data().msg,
                        isRead: lastMessageDetails.data().isRead,
                        alias: clientAlias,
                        id: clientId,
                      }]);
                    });
                  });
                });

        }

        getConvos()
    })

    return convos;

}