import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {useFontSize} from '../Header/ThemeAndSizePicker/FontSizeContext';
import {ChatBubbleProps} from './ChatBubble';
import {useBubbleColor} from '../Header/ThemeAndSizePicker/BubbleColorContext';

const BubbleView: React.FC<ChatBubbleProps> = ({
  user,
  id,
  text,
  clientUserId,
  isCurrentUserKurator,
}) => {
  const {fontSize} = useFontSize();
  const {backgroundColorSend, backgroundColorRecieve} = useBubbleColor();

  const sendColorStyle = {
    backgroundColor: backgroundColorSend,
    // backgroundColor: '#b5ccf7',
  };
  const recieveColorStyle = {
    backgroundColor: backgroundColorRecieve,
    // backgroundColor: '#ffd933',
  };

  const messageText = {
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    fontSize: Number(fontSize),
  };
  return !isCurrentUserKurator ? (
    <View
      style={[
        id === user?.uid
          ? [styles.bubbleSend, sendColorStyle]
          : [styles.bubbleRecieve, recieveColorStyle],
      ]}>
      <Text style={messageText}>{text}</Text>
    </View>
  ) : isCurrentUserKurator ? (
    <View
      style={[
        id === clientUserId
          ? [styles.bubbleRecieve, recieveColorStyle]
          : [styles.bubbleSend, sendColorStyle],
      ]}>
      <Text style={messageText}>{text}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  bubbleSend: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    padding: 9,
    minWidth: 0,
    maxWidth: '70%',
    borderRadius: 12,
  } as ViewStyle,
  bubbleRecieve: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    padding: 9,
    minWidth: 0,
    maxWidth: '70%',
    borderRadius: 12,
  } as ViewStyle,
});

export default BubbleView;
