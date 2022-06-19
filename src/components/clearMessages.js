import React, { } from 'react';
import { } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const clearMessages = () => {
        const clearMessage = async () => {
            const delMsg = await firestore().collection('rooms').doc('room1').collection('messages').where('author', '==', 'admin123').get().then(qs => {
                qs.forEach(doc => {
                    doc.ref.delete();
                })
            })
        }
        clearMessage();
}

export default clearMessages;