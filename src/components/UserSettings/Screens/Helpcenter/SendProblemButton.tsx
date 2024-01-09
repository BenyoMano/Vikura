import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

type SendProblemButtonProps = {
  title: string;
};

const SendProblemButton: React.FC<SendProblemButtonProps> = ({title}) => {
  const {btnTextStyle, btnContainerStyle} = styles;
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
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

  const onPress = () => {
    // firestore
  };

  return (
    <Pressable onPress={onPress} onPressIn={fadeIn} onPressOut={fadeOut}>
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
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 18,
    marginVertical: 10,
    width: 230,
    borderRadius: 12,
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default SendProblemButton;
