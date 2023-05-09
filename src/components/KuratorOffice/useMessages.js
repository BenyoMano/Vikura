import { useState, useEffect } from 'react';
import roomName from '../../firebase/roomName';

export const useMessages = ({setRoomId, isCurrentUserKurator, user, clientUserId}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const rumNamn = await roomName({clientUserId});
            const newMessage = rumNamn.docs.map(roomDetails => {
                const timestamp = roomDetails.data().timestamp.toMillis();
                const splitRefPath = roomDetails.ref.path.split('/');
                const roomId = splitRefPath[splitRefPath.length - 1];
                return {timestamp, roomId}
            });
            setMessages(newMessage);
            setRoomId(roomId);
        }
        getMessages();
    }, [])
    return messages;
}