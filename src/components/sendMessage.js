import React, { } from 'react';
import { } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const sendMessage= ({ msgToSend, user, refPath }) => {

        const addMessage = async () => {
            const getUserData = await firestore().collection('Users').doc(user.uid).get();
            console.log('Add message')
            await refPath.add({
                author: getUserData.get('alias'),
                kurator: getUserData.get('kurator'),
                msg: msgToSend,
                timestamp: new Date(),
                uid: user.uid,
            });
            console.log('=>', msgToSend) 
        }
        addMessage();
}

export default sendMessage;