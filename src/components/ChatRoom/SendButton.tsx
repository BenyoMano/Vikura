import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';

type SendButtonProps = {
  title: string;
  onPress: () => void;
};

const SendButton: React.FC<SendButtonProps> = ({title, onPress}) => {
  const {viewStyle, btnTextStyle, btnContainerStyle} = styles;
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
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

  return (
    <View style={viewStyle}>
      <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
        <Animated.View
          style={[
            btnContainerStyle,
            {
              opacity: animated,
            },
          ]}>
          <Text style={btnTextStyle}>{title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  btnContainerStyle: {
    width: 100,
    height: 52,
    backgroundColor: 'lightgrey',
    borderRadius: 12,
    justifyContent: 'center',
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  } as ViewStyle,
});

export default SendButton;
