import React, { } from 'react';
import { } from 'react-native';


const sendMessage= ({ msgToSend, user, refPath }) => {

        const addMessage = async () => {
            
            console.log('Add message')
            await refPath.add({
                uid: user.uid,
                author: 'admin123',
                msg: msgToSend,
                timestamp: new Date(),
            });
            console.log('=>', msgToSend) 
        }
        addMessage();
}

export default sendMessage;