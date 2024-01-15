import React from 'react';
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
import {RoomData} from './useRoomsData';
import {StackParamList} from '../../../../App';

const ConversationRoom: React.FC<RoomData> = ({
  roomId,
  clientAlias,
  clientId,
  isRead,
  text,
  timestamp,
}) => {
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

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  if (timestamp === undefined || isRead === undefined || text === undefined)
    return null;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatScreen', {
          id: clientId,
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
          <Text style={styles.title}>{clientAlias}</Text>
          <Text style={styles.timestamp}>{timestamp.toLocaleString()}</Text>
        </View>
        <View>
          <Text style={isRead ? styles.isRead.text : styles.notIsRead.text}>
            {text.length < 100 ? text : text.substring(0, 100) + '...'}
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
