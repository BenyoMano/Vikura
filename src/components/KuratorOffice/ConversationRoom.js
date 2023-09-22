/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {DeleteUserModal} from './DeleteUserModal';

const ConversationRoom = ({roomId, clientAlias, clientId}) => {
  const [latestMessage, setLatestMessage] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const modalStyle = {
    backgroundColor: modalVisible ? 'lightgrey' : '#EEEEEE',
    borderBottomWidth: modalVisible ? 2 : 1,
    borderTopColor: modalVisible ? 'black' : null,
  };

  const opacityAnimation = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let unsubscribeFromLastMessage;
    const subscribeToLastMessage = async () => {
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      unsubscribeFromLastMessage = pathToMessages
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

    subscribeToLastMessage();
    return () => unsubscribeFromLastMessage();
  }, []);

  const navigation = useNavigation();
  if (latestMessage === undefined) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate('ChatScreen', {id: latestMessage.id})}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onLongPress={() => {
        setModalVisible(!modalVisible);
      }}>
      <Animated.View
        style={[
          styles.conversationRoom.item,
          modalStyle,
          {
            opacity: opacityAnimation,
          },
        ]}>
        {modalVisible && (
          <DeleteUserModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clientId={clientId}
          />
        )}
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
            {latestMessage.text.length < 100
              ? latestMessage.text
              : latestMessage.text.substring(0, 100) + '...'}
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
  conversationRoom: {
    item: {
      position: 'relative',
      padding: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: '#EEEEEE',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      borderBottomColor: 'black',
      zIndex: 1,
      elevation: 1,
      overflow: 'visible',
    },
  },
};

export default ConversationRoom;
