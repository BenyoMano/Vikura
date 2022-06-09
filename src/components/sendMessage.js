import React, { } from 'react';
import { Text, View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import InputBarChatt from './InputBarChatt';



const sendMessage= (props) => {
        const addMessage = async () => {
            const ref = firestore().collection('rooms').doc('room1').collection('messages');
             console.log('Add message')
            await ref.add({
                msg: {In},
                timestamp: new Date(),
            });
            console.log('--msg added') 
        }
        addMessage();
}

export default sendMessage;