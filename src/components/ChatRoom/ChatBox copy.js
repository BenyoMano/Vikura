/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState, useMemo, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, StyleSheet, View} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {IsKuratorContext} from '../../firebase/isKuratorContext';
import useOpenChat from '../../firebase/openChat'; 
import BubblaView from './BubblaView';
import {useMessages} from './useMessages';
import Message from './Message';

const ChatBox = ({refPath, setRefPath, clientUserId, setRoomId}) => {
  const messages = useMessages();
  
  const renderItem = ({item}) => (
    <Message
    timestamp={item.timestamp}
    displayTimestamp={item.displayTimestamp}
    text={item.text}
    author={item.author}
    id={item.id}
    />
    );
    
    const sortedMessages = useMemo(
      () => messages.sort((a, b) => a.timestamp - b.timestamp),
      [messages],
    );
    
  const isKurator = useContext(IsKuratorContext);
  // const [messages, setMessages] = useState([]);
  const [msgLimit, setMsgLimit] = useState(0);
  console.log('msgLimit: ', msgLimit);
  const flatListRef = useRef();
  const user = auth().currentUser;

  const openChat = useOpenChat({
    isKurator,
    user,
    clientUserId,
    refPath, // antagligen onödig
    setRefPath,
    setMessages,
    setRoomId,
  });

  useEffect(() => {
    openChat(msgLimit);
  }, [msgLimit]);


  return (
    <View style={styles.greyScale.viewStyle}>
      <AutoScrollFlatList
        ref={flatListRef}
        horizontal={false}
        numColumns={1}
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        scrollEventThrottle={160}
        showNewItemAlert={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  greyScale: {
    viewStyle: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: 30,
      marginBottom: 22,
      height: 550,
      width: '88%',
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: 'white',
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
});

export default ChatBox;
