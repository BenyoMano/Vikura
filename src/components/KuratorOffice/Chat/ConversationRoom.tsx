import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {RoomData} from './useRoomsData';
import {StackParamList} from '../../../../App';

type LatestMessage = {
  timestamp: number;
  displayTimestamp: Date;
  text: string;
  isRead: boolean;
  alias: string;
  id: string;
};

const ConversationRoom: React.FC<RoomData> = ({
  roomId,
  clientAlias,
  clientId,
}) => {
  const [latestMessage, setLatestMessage] = useState<LatestMessage | undefined>(
    undefined,
  );

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
    let unsubscribeFromLastMessage: () => void;
    const subscribeToLastMessage = async () => {
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      unsubscribeFromLastMessage = pathToMessages
        .orderBy('timestamp', 'desc')
        .limit(1)
        .onSnapshot(
          lastMessage => {
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
          },
          error => {
            console.error('lastMessage:', error);
          },
        );
    };

    subscribeToLastMessage();
    return () => unsubscribeFromLastMessage();
  }, [clientAlias, clientId, roomId]);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  if (latestMessage === undefined) return null;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatScreen', {
          id: latestMessage.id,
        })
      }
      onPressIn={fadeIn}
      onPressOut={fadeOut}>
      <Animated.View
        style={[
          styles.conversationRoom.item,
          {
            opacity: opacityAnimation,
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
  } as ViewStyle,
  title: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    paddingBottom: 5,
  } as TextStyle,
  timestamp: {
    fontSize: 14,
    color: 'black',
    paddingTop: 5,
  } as TextStyle,
  isRead: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    } as TextStyle,
  },
  notIsRead: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Bold',
    } as TextStyle,
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
    } as ViewStyle,
  },
};

export default ConversationRoom;
