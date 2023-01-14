import React, {useCallback, useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, View, RefreshControl} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import useColorStyle from '../../atoms/colorStyle';
import openChat from '../../firebase/openChat';

const ChattRuta = ({isKurator, setRefPath, clientUserId}) => {
  const {color, greyScale} = styles;
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const colorStyle = useColorStyle();
  const user = auth().currentUser;
  
  
  // const openChat = async () => {
  //   console.log('isKurator:', isKurator)
  //   if (isKurator === undefined) return;
  //   if (isKurator) {
  //     console.log('Client UserId', clientUserId);

  //     const getRoomName = await firestore()
  //       .collection('rooms')
  //       .where('users.client.id', '==', clientUserId)
  //       .get();

  //     getRoomName.docs.map(d => {
  //       const splitRef = d.ref.path.split('/');
  //       const last = splitRef[splitRef.length - 1];
  //       const docPath = firestore()
  //         .collection('rooms')
  //         .doc(last)
  //         .collection('messages');
  //       setRefPath(docPath);

  //       //console.log('docPath', docPath);
  //       // console.log('refPath', refPath);
  //       docPath.onSnapshot(querySnapshot => {
  //         const newData = querySnapshot.docs.map(documentSnapshot => ({
  //           timestamp: documentSnapshot.data().timestamp.toDate(),
  //           text: documentSnapshot.data().msg,
  //           author: documentSnapshot.data().author,
  //           id: documentSnapshot.data().id,
  //         }));
  //         setMessages(newData);
  //       });
  //     });
  //   } else {
  //     clientUserId = user.uid;
  //     //console.log('user.uid', user.uid);
  //     console.log('clientUserId', clientUserId);

  //     const getRoomName = await firestore()
  //       .collection('rooms')
  //       .where('users.client.id', '==', clientUserId)
  //       .get();
  //     console.log('getRoomName.empty ?', getRoomName.empty);

  //     if (!getRoomName.empty) {
  //       getRoomName.docs.map(d => {
  //         const splitRef = d.ref.path.split('/');
  //         const last = splitRef[splitRef.length - 1];
  //         const docPath = firestore()
  //           .collection('rooms')
  //           .doc(last)
  //           .collection('messages');
  //         setRefPath(docPath);

  //         docPath.onSnapshot(querySnapshot => {
  //           console.log('RUM FINNS -- EFTER');
  //           const newData = querySnapshot.docs.map(documentSnapshot => ({
  //             timestamp: documentSnapshot.data().timestamp.toDate(),
  //             text: documentSnapshot.data().msg,
  //             author: documentSnapshot.data().author,
  //             id: documentSnapshot.data().id,
  //           }));
  //           setMessages(newData);
  //         });
  //       });
  //     } else {
  //       console.log('Room does not exist!');
  //       const createRoom = async () => {
  //         const roomRef = firestore().collection('rooms');
  //         console.log('Creating room');
  //         const getAlias = await firestore()
  //           .collection('Users')
  //           .doc(clientUserId)
  //           .get();
          
  //         await roomRef.add({
  //           users: {
  //             client: {
  //               alias: getAlias.get('alias'),
  //               id: clientUserId,
  //             },
  //           },
  //         });
          
  //         const newGetRoomName = await firestore()
  //         .collection('rooms')
  //         .where('users.client.id', '==', clientUserId)
  //         .get();

  //         refPath({newGetRoomName, setRefPath});
  //       };
  //       createRoom();
  //       showMessage({
  //         message: "Välkommen!",
  //         description: "Du kan börja chatta direkt!",
  //         type: "info",
  //         position: "center",
  //         floating: true,
  //         duration: 2500
  //       });
  //     }
  //   }
  // };


  useEffect(() => {
    openChat({isKurator, user, clientUserId, setRefPath, setMessages});
    return () => openChat();
  }, [isKurator]);
  

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log('Refreshing...');
    openChat();
    setRefreshing(false);
    console.log('--refreshed--');
  }, [refreshing]);

  function Item({text, timestamp, id}) {
    if (isKurator === undefined) return;
    return (
       !isKurator ? (
        <View style={id === user.uid ? styles.bubblaSend : styles.bubblaRecieve}>
          <View
            style={
              id === user.uid
                ? styles.bubblaSend.bubbla
                : styles.bubblaRecieve.bubbla
            }>
            <Text style={styles.text.message}>{text}</Text>
          </View>
          <View
            style={
              id === user.uid
                ? styles.bubblaSend.timestamp
                : styles.bubblaRecieve.timestamp
            }>
            <Text style={styles.text.author}>
              {timestamp.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
            </Text>
          </View>
        </View>
      ) : isKurator ? (
        <View style={id === clientUserId ? styles.bubblaRecieve : styles.bubblaSend }>
        <View
          style={
            id === clientUserId
              ? styles.bubblaRecieve.bubbla
              : styles.bubblaSend.bubbla
          }>
          <Text style={styles.text.message}>{text}</Text>
        </View>
        <View
          style={
            id === clientUserId
              ? styles.bubblaRecieve.timestamp
              : styles.bubblaSend.timestamp
          }>
          <Text style={styles.text.author}>
            {timestamp.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
        </View>
      </View>
      ) : null
    );
  }
  const renderItem = ({item}) => (
    <Item
      timestamp={item.timestamp}
      text={item.text}
      author={item.author}
      id={item.id}
    />
  );
  return (
    <View style={colorStyle === true ? color.viewStyle : greyScale.viewStyle}>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={messages.sort((a, b) => a.timestamp - b.timestamp)} //a.timestamp.localeCompare(b.timestamp))}
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
  color: {
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
      backgroundColor: '#ffffe7'
    },
  },
  greyScale: {
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
      backgroundColor: 'white'
    },
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
      // backgroundColor: '#C7D4F6',
      backgroundColor: '#b5ccf7',
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
      // backgroundColor: '#FCF789',
      backgroundColor: '#ffd933',
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
