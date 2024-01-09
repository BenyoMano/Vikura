import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

type RequestDeleteButtonProps = {
  title: string;
};

const RequestDeleteButton: React.FC<RequestDeleteButtonProps> = ({title}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
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

  const onPress = () => {
    //firestore grej
  };

  return (
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
  );
};

export const styles = StyleSheet.create({
  btnContainerStyle: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 15,
  } as ViewStyle,
  btnTextStyle: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default RequestDeleteButton;
