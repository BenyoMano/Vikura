import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const usersCollection = firestore().collection('Users');
const userDocument = firestore().collection('Users').doc('Kurator');

const DATA = [
    {
        id: '1',
        text: 'a',
        value: 'send',
    },
    {    
        id: '2',
        text: 's',
        value: 'recieve',
    },
    {
        id: '3',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'send',
    },
    {
        id: '4',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'send',
    },
    {
        id: '5',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'recieve',
    },
    {
        id: '6',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'send',
    },
    {
        id: '7',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'recieve',
    },
    {
        id: '8',
        text: 'Nej, blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta blawd nsdbad gdyat fafd afdy tfaydtf yastdf yatfsyt fya fyafs yf yta',
        value: 'send',
    },
]

function Item({ text, value }) {
   // console.log('Value: ' + value)
    return (
            <View style={value === 'send' ? styles.bubblaSend : styles.bubblaRecieve} >
                <Text style={styles.text}>{text}</Text> 
            </View>
    );
}

const ChattRuta = () => {
    const { viewStyle } = styles;

   // const [data, setData] = useState("initial");
    const ref = firestore().collection('rooms').doc('room1').collection('messages');

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
            console.log('--room loaded') */
            console.log('Get chat')
            const chat = await firestore().collection('rooms').doc('room1').collection('messages').get();
            chat.forEach(doc => {
                const bTimestamp = doc.data().timestamp+(1970*3600*24*365);
                const year = (bTimestamp)/(3600*24*365);
                const month = (1-(year-Math.floor(year)))*12;
                const day = (month-Math.floor(month))*(365/12);
                const hour = (day-Math.floor(day))*24;
                const minute = (hour-Math.floor(hour))*60;
                const Rtimestamp = [Math.floor(year), Math.floor(month), Math.floor(day), Math.floor(hour), Math.floor(minute)]
                console.log('=>', doc.data().msg, Rtimestamp, '=>', doc.data().author);
            });
            //console.log(chat)
            console.log('--chat loaded')
            console.log('Get all users')
            const allUsers = await firestore().collection('Users').get();
            allUsers.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
            console.log('--All users loaded')
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
    
    const renderItem = ({ item }) => (
        <Item 
            text={item.text}
            value={item.value} />
    );
    return (
        <View style={viewStyle}>
            {/* <Text>{data}</Text> */}
             <FlatList
            horizontal={false}
            numColumns={1}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
    bubblaSend: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        padding: 9,
        minWidth: 0,
        maxWidth: '70%',
        backgroundColor: '#C7D4F6',
        borderRadius: 12,
    },
    bubblaRecieve: {
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
    }
    }

export default ChattRuta;