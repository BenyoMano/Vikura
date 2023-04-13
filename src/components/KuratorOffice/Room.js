import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Room = ({roomId, clientAlias, clientId}) => {
  const [latestMessage, setLatestMessage] = useState(undefined);
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let unsubscribe;
    const getLatestMessage = async () => {
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      unsubscribe = pathToMessages
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
            });
          });
        });
    };

    getLatestMessage();
    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();
  if (latestMessage === undefined) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate('ChatView', {id: latestMessage.id})}
      onPressIn={fadeIn}
      onPressOut={fadeOut}>
      <Animated.View
        style={[
          styles.greyScale.item,
          {
            opacity: animated,
          },
        ]}>
        <View style={styles.header}>
          <Text style={styles.title}>{latestMessage.alias}</Text>
          <Text style={styles.timestamp}>
            {latestMessage.displayTimestamp.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text
            style={
              latestMessage.isRead ? styles.isRead.text : styles.notIsRead.text
            }>
            {latestMessage.text}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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

export default Room;
