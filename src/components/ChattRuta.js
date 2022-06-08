import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';



const ChattRuta = () => {
    const { viewStyle } = styles;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const openChat = async () => {
            const firebaseMessages = await firestore().collection('rooms').doc('room1').collection('messages').get();
            const newMessages = firebaseMessages.docs.map(firebaseMessage => ({
                    timestamp: firebaseMessage.data().timestamp.toDate().toLocaleString([], {hour: '2-digit', minute: '2-digit'}), //firebaseMessage.data().timestamp.toDate().toLocaleDateString() + ' ' + firebaseMessage.data().timestamp.toDate().toLocaleTimeString(),
                    text: firebaseMessage.data().msg,
                    author: firebaseMessage.data().author
                }),
            );
            setMessages(newMessages)
        }
        openChat();
    }, [])

    useEffect(() => {
        const addMessage = async () => {
/*             console.log('Add message')
            await ref.add({
                msg: 'messageAdded',
            });
            console.log('--msg added') */
        }
        addMessage();
    }, [])
    
    function Item({ text, author, timestamp }) {
        console.log(timestamp);
        return (
                <View style={author === 'admin123' ? styles.bubblaSend : styles.bubblaRecieve}>
                    <View style={author === 'admin123' ? styles.bubblaSend.bubbla : styles.bubblaRecieve.bubbla} >
                        <Text style={styles.text.message}>{text}</Text> 
                    </View>
                    <View style={author === 'admin123' ? styles.bubblaSend.timestamp : styles.bubblaRecieve.timestamp}>
                        <Text style={styles.text.author}>{timestamp}</Text>
                    </View>
                </View>
        );
    }
    const renderItem = ({ item }) => (
        <Item 
            timestamp={item.timestamp}
            text={item.text}
            author={item.author}
            />
    );
    return (
        <View style={viewStyle}>
             <FlatList
            horizontal={false}
            numColumns={1}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.timestamp}
            />
        </View>
    );
}
const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 30,
        marginBottom: 22,
        height: 550,
        width: 360,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
    },
    text: {
      message: {
        color: 'black',
        fontFamily: 'NunitoSans-Regular',
        
      },
      author: {
        color: 'grey',
        fontFamily: 'NunitoSans-Light',
        fontSize: 10,
      },
    },
    bubblaSend: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end',
        bubbla: {
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 5,
            marginRight: 10,
            padding: 9,
            minWidth: 0,
            maxWidth: '70%',
            backgroundColor: '#C7D4F6',
            borderRadius: 12,
        },
        timestamp: {
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginBottom: 8,
            marginRight: 10,
        },
    },
    bubblaRecieve: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        bubbla: {
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 10,
            padding: 9,
            minWidth: 0,
            maxWidth: '70%',
            backgroundColor: '#FCF789',
            borderRadius: 12,
        },
        timestamp: {
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginBottom: 8,
            marginLeft: 10,
        },
    }
    }

export default ChattRuta;