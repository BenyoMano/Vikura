import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, RefreshControl, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import openConvo from '../../firebase/openConvo';
import ConvoLoader from './ConvoLoader';
import { useRooms } from './useRooms';
import firestore from '@react-native-firebase/firestore';

const Room = ({roomId, clientAlias, clientId}) => {
  const [latestMessage, setLatestMessage] = useState(undefined);
 // console.log('Latest', latestMessage )

  useEffect(()=>{
    let unsubscribe; 
   const getLatestMessage = async ()=> {
        const pathToMessages = firestore()
          .collection('rooms')
          .doc(roomId)
          .collection('messages');

          unsubscribe = 
                pathToMessages
                  .orderBy('timestamp', 'desc')
                  .limit(1)
                  .onSnapshot(lastMessage => {
                    lastMessage.docs.forEach(lastMessageDetails => {
                      setLatestMessage({
                        timestamp: lastMessageDetails.data().timestamp.toMillis(),
                        displayTimestamp: lastMessageDetails.data().timestamp.toDate(), 
                        text: lastMessageDetails.data().msg,
                        isRead: lastMessageDetails.data().isRead,
                        alias: clientAlias,
                        id: clientId,
                      })
                  });
                });
   }

   getLatestMessage()
   return () => unsubscribe();
  }, [])

  const navigation = useNavigation();
  if (latestMessage === undefined) return null;

  return (
    <Pressable 
    onPress={() => navigation.navigate('ChatView', {id: latestMessage.id})}>
      <View style={styles.greyScale.item}>
        <View style={styles.header}>
          <Text style={styles.title}>{latestMessage.alias}</Text>
          <Text style={styles.timestamp}>{latestMessage.displayTimestamp.toLocaleString()}</Text>
        </View>
        <View>
          <Text style={latestMessage.isRead ? styles.isRead.text : styles.notIsRead.text}>{latestMessage.text}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const Conv = () => {
  // const [convos, setConvos] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const rooms = useRooms();

  
  // useEffect(() => {
  //   openConvo({setConvos, setIsLoaded});
  //  // return () => openConvo();
  // }, [setConvos, setIsLoaded]);

  // fungerar inte - TypeError: Cannot read property 'setConvos' of undefined
  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   setIsLoaded(false);
  //   openConvo({setConvos, setIsLoaded});
  //   setIsLoaded(true);
  //   setRefreshing(false);
  // }, [refreshing]);

  // const sortedConvos = convos.sort((a, b) => b.timestamp < a.timestamp);

  function Item({alias, text, isRead, displayTimestamp, id}) {
    const navigation = useNavigation();
    return (
      <Pressable 
      onPress={() => navigation.navigate('ChatView', {id: id})}>
        <View style={styles.greyScale.item}>
          <View style={styles.header}>
            <Text style={styles.title}>{alias}</Text>
            <Text style={styles.timestamp}>{displayTimestamp.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={isRead ? styles.isRead.text : styles.notIsRead.text}>{text}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  //console.log('rooms', rooms);
  const renderItem = ({item}) => (
    <Room roomId={item.roomId} clientAlias={item.clientAlias} clientId={item.clientId} key={item} />
  );

  return (
    <View style={styles.container}>
      {!isLoaded ? 
        ( 
          <ConvoLoader />
        ) : 
        (
          <FlatList
            horizontal={false}
            numColumns={1}
            data={rooms}
            renderItem={renderItem}
            keyExtractor={item => item.roomId}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        )
      }
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flex: 1,
    width: 'auto',
    marginTop: '7%',
    marginBottom: '1%',
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    paddingBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: 'black',
    paddingTop: 5,
  },
  isRead: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    },
  },
  notIsRead: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Bold',
    },
  },
  greyScale: {
    item: {
      padding: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: '#EEEEEE',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      borderBottomColor: 'black',
    },
  },
};

export default Conv;
