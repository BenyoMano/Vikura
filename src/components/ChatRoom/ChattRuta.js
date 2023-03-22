/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState, useMemo} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, StyleSheet, View} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {IsKuratorContext} from '../../firebase/isKuratorContext';
import useOpenChat from '../../firebase/openChat';

const ChattRuta = ({refPath, setRefPath, clientUserId}) => {
  const isKurator = useContext(IsKuratorContext);
  const [messages, setMessages] = useState([]);
  const [msgLimit, setMsgLimit] = useState(0);
  const user = auth().currentUser;
  const openChat = useOpenChat({
    isKurator,
    user,
    clientUserId,
    refPath,
    setRefPath,
    setMessages,
  });

  const onScroll = e => {
    const scrollOffset = e.nativeEvent.contentOffset.y;
    if (scrollOffset <= 10) {
      // Doesn't work perfectly, seems to load at least once initially
      console.log('setMsgLimit');
      setMsgLimit(msgLimit + 15);
    }
  };
  const onMomentumScrollEnd = event => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const calc = layoutHeight + contentOffsetY >= contentSizeHeight - 150;
    if (msgLimit !== 0 && calc) {
      // Doesn't work perfectly, seems to load at least once initially
      console.log('Near bottom reached, load more!');
      setMsgLimit(0);
    }
  };

  useEffect(() => {
    // if (isKurator !== undefined) {
    openChat(msgLimit);
    // return () => OpenChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgLimit]);

  function Item({text, id, displayTimestamp}) {
    const currentDay = new Date().toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const currentYear = new Date().toLocaleString([], {year: 'numeric'});

    const sameDay =
      displayTimestamp.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }) === currentDay
        ? true
        : false;
    const sameYear =
      displayTimestamp.toLocaleString([], {year: 'numeric'}) === currentYear
        ? true
        : false;

    return !isKurator ? (
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
            {sameDay
              ? displayTimestamp.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : sameYear
              ? displayTimestamp.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : isKurator ? (
      <View
        style={id === clientUserId ? styles.bubblaRecieve : styles.bubblaSend}>
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
            {sameDay
              ? displayTimestamp.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : sameYear
              ? displayTimestamp.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : null;
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
  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.timestamp - b.timestamp),
    [messages],
  );
  return (
    <View style={styles.greyScale.viewStyle}>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        onScroll={onScroll}
        scrollEventThrottle={160}
        showNewItemAlert={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
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

export default ChattRuta;
