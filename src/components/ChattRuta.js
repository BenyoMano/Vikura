import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const usersCollection = firestore().collection('Users');
const userDocument = firestore().collection('Users').doc('Kurator');

const ChattRuta = () => {
    const { viewStyle } = styles;
    const [messages, setMessages] = useState([]);

    const ref = firestore().collection('rooms').doc('room1').collection('messages');

    useEffect(() => {
        const openChat = async () => {
            const firebaseMessages = await firestore().collection('rooms').doc('room1').collection('messages').get();
            const newMessages = firebaseMessages.docs.map(firebaseMessage => ({
                    timestamp: firebaseMessage.data().timestamp,
                    text: firebaseMessage.data().msg,
                    author: firebaseMessage.data().author
                })
                
           // console.log('=>', doc.data().msg, '=>', doc.data().timestamp, '=>', doc.data().author);
            );
            setMessages(newMessages)
        }
        openChat();
    }, [])

    useEffect(() => {
        const getUser = async () => {
  /*           console.log("Get user")
            const userDocument = await firestore().collection('Users').doc('Kurator').get();
            console.log(userDocument)
          //  setData([userDocument])
            console.log("-user loaded") */
        }
        getUser();
    }, [])
    useEffect(() => {
        const getRoom = async () => {
/*             console.log('Get chat room')
            const chatRoom = await firestore().collection('rooms').doc('room1').get();
            console.log(chatRoom)
            console.log('--room loaded') 
             console.log('Get chat')
            const chat = await firestore().collection('rooms').doc('room1').collection('messages').get();
            chat.forEach(doc => {
                
                console.log('=>', doc.data().msg, Rtimestamp, '=>', doc.data().author);
            });
            //console.log(chat)
             console.log('--chat loaded')
            console.log('Get all users')
            const allUsers = await firestore().collection('Users').get();
            allUsers.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
            console.log('--All users loaded')  */
        }
        getRoom();
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
                        <Text style={styles.text.author}>{author}</Text>
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