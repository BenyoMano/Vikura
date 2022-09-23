import React, { } from 'react';
import { } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const sendMessage= ({ msgToSend, user, refPath }) => {

        const addMessage = async () => {
            const getAlias = await firestore().collection('Users').doc(user.uid).get();
            console.log('Add message')
            await refPath.add({
                uid: user.uid,
                author: getAlias.get('alias'),
                msg: msgToSend,
                timestamp: new Date(),
            });
            console.log('=>', msgToSend) 
        }
        addMessage();
}

export default sendMessage;