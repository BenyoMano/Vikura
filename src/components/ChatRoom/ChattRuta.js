import React, {useCallback, useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, StyleSheet, View, RefreshControl} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import openChat from '../../firebase/openChat';


const ChattRuta = ({isKurator, refPath, setRefPath, clientUserId}) => {
  const [messages, setMessages] = useState([]);
  const [msgLimit, setMsgLimit] = useState(0);
  const user = auth().currentUser; 

  const onScroll = (e) => {
    const scrollOffset = e.nativeEvent.contentOffset.y
    if (scrollOffset <= 10) {
      setMsgLimit(msgLimit + 15);
    }
  }
  
  useEffect(() => {
    if (isKurator !== undefined) {
      openChat({isKurator, user, clientUserId, refPath, setRefPath, setMessages, msgLimit});
      return () => openChat();
    }  
  }, [isKurator, msgLimit]);

  function Item({text, id, displayTimestamp}) {

    const currentDay = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'});
    const currentYear = new Date().toLocaleString([], {year: 'numeric'});

    const sameDay = displayTimestamp.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'}) === currentDay ? true : false;
    const sameYear = displayTimestamp.toLocaleString([], {year: 'numeric'}) === currentYear ? true : false;

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
              {
                sameDay ? displayTimestamp.toLocaleString([], {hour: 'numeric', minute: 'numeric'})
                : sameYear ? displayTimestamp.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
                : displayTimestamp.toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric' })
              }
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
            {
              sameDay ? displayTimestamp.toLocaleString([], {hour: 'numeric', minute: 'numeric'})
              : sameYear ? displayTimestamp.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
              : displayTimestamp.toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric' })
            }
          </Text>
        </View>
      </View>
      ) : null
    );
  }
  const renderItem = ({item}) => (
    <Item
      timestamp={item.timestamp}
      displayTimestamp={item.displayTimestamp}
      text={item.text}
      author={item.author}
      id={item.id}
    />
  );
  return (
    <View style={styles.greyScale.viewStyle}>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={messages.sort((a, b) => a.timestamp - b.timestamp)}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        onScroll={onScroll}
        scrollEventThrottle={160}
        showNewItemAlert={false}
        onMomentumScrollEnd={(event) => {
          if (msgLimit !== 0 && 
            (event.nativeEvent.layoutMeasurement.height 
            + event.nativeEvent.contentOffset.y 
            >= event.nativeEvent.contentSize.height 
            - 150)) {
            setMsgLimit(0);
          }
        }}
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

export default ChattRuta;
