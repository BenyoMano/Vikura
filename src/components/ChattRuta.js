import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';

const ChattRuta = ({user, refPath, setRefPath, clientUserId}) => {
  const {viewStyle} = styles;
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getRefPath(getRoomName) {
    getRoomName.docs.map(d => {
      const splitRef = d.ref.path.split('/');
      const last = splitRef[splitRef.length - 1];
      const docPath = firestore()
        .collection('rooms')
        .doc(last)
        .collection('messages');
      setRefPath(docPath);

      console.log('RUN');
    });
  }

  async function runRefPath(refPath) {
    refPath.onSnapshot(querySnapshot => {
      const newData = querySnapshot.docs.map(documentSnapshot => ({
        timestamp: documentSnapshot.data().timestamp.toDate(),
        text: documentSnapshot.data().msg,
        author: documentSnapshot.data().author,
        uid: documentSnapshot.data().uid,
      }));
      setMessages(newData);
    });
  }

  const openChat = async () => {
    const isKurator = await firestore().collection('Users').doc(user.uid).get();
    console.log('Kurator', isKurator.get('kurator'));
    if (isKurator.get('kurator') == true) {
      console.log('Client UserId', clientUserId);
      const getRoomName = await firestore()
        .collection('rooms')
        .where('users.client.uid', '==', clientUserId)
        .get();
      getRoomName.docs.map(d => {
        const splitRef = d.ref.path.split('/');
        const last = splitRef[splitRef.length - 1];
        const docPath = firestore()
          .collection('rooms')
          .doc(last)
          .collection('messages');
        setRefPath(docPath);
        console.log('docPath', docPath);
        console.log('refPath', refPath);
        docPath.onSnapshot(querySnapshot => {
          const newData = querySnapshot.docs.map(documentSnapshot => ({
            timestamp: documentSnapshot.data().timestamp.toDate(),
            text: documentSnapshot.data().msg,
            author: documentSnapshot.data().author,
            uid: documentSnapshot.data().uid,
          }));
          setMessages(newData);
        });
      });
    } else {
      console.log('uid', user.uid);
      const getRoomName = await firestore()
        .collection('rooms')
        .where('users.client.uid', '==', user.uid)
        .get();
      console.log('Room name', getRoomName.empty);
      if (!getRoomName.empty) {
        getRoomName.docs.map(d => {
          const splitRef = d.ref.path.split('/');
          const last = splitRef[splitRef.length - 1];
          const docPath = firestore()
            .collection('rooms')
            .doc(last)
            .collection('messages');
          setRefPath(docPath);

          docPath.onSnapshot(querySnapshot => {
            console.log('RUM FINNS -- EFTER');
            const newData = querySnapshot.docs.map(documentSnapshot => ({
              timestamp: documentSnapshot.data().timestamp.toDate(),
              text: documentSnapshot.data().msg,
              author: documentSnapshot.data().author,
              uid: documentSnapshot.data().uid,
            }));
            setMessages(newData);
          });
        });
        // getRefPath(getRoomName);
        // runRefPath();
      } else {
        console.log('Room does not exist!');
        const createRoom = async () => {
          const roomRef = firestore().collection('rooms');
          console.log('Creating room');
          const getAlias = await firestore()
            .collection('Users')
            .doc(user.uid)
            .get();

          await roomRef.add({
            users: {
              client: {
                alias: getAlias.get('alias'),
                uid: user.uid,
              },
            },
          });
          //const getRoomName = await firestore().collection('rooms').where('users.client.uid', '==', user.uid).get();
          getRefPath(getRoomName);
        };
        createRoom();
      }
    }
  };

  useEffect(() => {
    openChat();
    return () => openChat();
  }, []);

  /*     useEffect(() => {
        runRefPath();
    }, [refPath]) */

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log('Refreshing...');
    openChat();
    setRefreshing(false);
    console.log('--refreshed--');
  }, [refreshing]);

  function Item({text, timestamp, uid}) {
    return (
      <View style={uid === user.uid ? styles.bubblaSend : styles.bubblaRecieve}>
        <View
          style={
            uid === user.uid
              ? styles.bubblaSend.bubbla
              : styles.bubblaRecieve.bubbla
          }>
          <Text style={styles.text.message}>{text}</Text>
        </View>
        <View
          style={
            uid === user.uid
              ? styles.bubblaSend.timestamp
              : styles.bubblaRecieve.timestamp
          }>
          <Text style={styles.text.author}>
            {timestamp.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
        </View>
      </View>
    );
  }
  const renderItem = ({item}) => (
    <Item
      timestamp={item.timestamp}
      text={item.text}
      author={item.author}
      uid={item.uid}
    />
  );
  return (
    <View style={viewStyle}>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={messages.sort((a, b) => a.timestamp > b.timestamp)} //a.timestamp.localeCompare(b.timestamp))}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        //onScrollEndDrag
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
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
      marginTop: 10,
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
      marginTop: 10,
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
  },
};

export default ChattRuta;
