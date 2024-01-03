import React, {memo} from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';
import BubbleView from './BubbleView';
import {useFontSize} from '../Header/ThemeAndSizePicker/FontSizeContext';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type ChatBubbleProps = {
  user: FirebaseAuthTypes.User | null;
  id: string;
  text: string;
  clientUserId: string;
  displayTimestamp?: Date;
  isCurrentUserKurator: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = memo(
  ({user, id, text, clientUserId, displayTimestamp, isCurrentUserKurator}) => {
    const {fontSize} = useFontSize();
    const authorText = {
      color: 'grey',
      fontFamily: 'NunitoSans-Light',
      fontSize: fontSize / 1.4,
    };

    const currentDay = new Date().toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const currentYear = new Date().toLocaleString([], {year: 'numeric'});

    const isSameDay =
      displayTimestamp?.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }) === currentDay
        ? true
        : false;
    const isSameYear =
      displayTimestamp?.toLocaleString([], {year: 'numeric'}) === currentYear
        ? true
        : false;

    return !isCurrentUserKurator ? (
      <View style={id === user?.uid ? styles.bubbleSend : styles.bubbleRecieve}>
        <BubbleView
          id={id}
          text={text}
          user={user}
          clientUserId={clientUserId}
          isCurrentUserKurator={isCurrentUserKurator}
        />
        <View
          style={
            id === user?.uid ? styles.timestampSend : styles.timestampReceive
          }>
          <Text style={authorText}>
            {isSameDay
              ? displayTimestamp?.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : isSameYear
              ? displayTimestamp?.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp?.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : isCurrentUserKurator ? (
      <View
        style={id === clientUserId ? styles.bubbleRecieve : styles.bubbleSend}>
        <BubbleView
          id={id}
          text={text}
          user={user}
          clientUserId={clientUserId}
          isCurrentUserKurator={isCurrentUserKurator}
        />
        <View
          style={
            id === clientUserId ? styles.timestampReceive : styles.timestampSend
          }>
          <Text style={authorText}>
            {isSameDay
              ? displayTimestamp?.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : isSameYear
              ? displayTimestamp?.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp?.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : null;
  },
);

const styles = StyleSheet.create({
  bubbleSend: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  } as ViewStyle,
  timestampSend: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginRight: 10,
  } as ViewStyle,
  bubbleRecieve: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  } as ViewStyle,
  timestampReceive: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginLeft: 10,
  } as ViewStyle,
});

export default ChatBubble;
