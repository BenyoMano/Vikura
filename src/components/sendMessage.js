import React, { } from 'react';
import { } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const sendMessage= ({ msgToSend, setMsgToSend, user }) => {


        const addMessage = async () => {
            const ref = firestore().collection('rooms').doc('room1').collection('messages');
             console.log('Add message')
            await ref.add({
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