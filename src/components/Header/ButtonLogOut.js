import React from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const ButtonLogOut = ({title, onPress}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-20deg'],
  });
  const buttonTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedRotateStyle = {
    transform: [{translateX: buttonTranslate}, {rotateZ: buttonRotate}],
  };

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={btnContainerStyle}>
        <Animated.View style={[animatedRotateStyle]}>
          <Icon
            name="logout"
            type="simple-line-icons"
            color="black"
            size={40}
            style={{transform: [{rotateZ: '180deg'}]}}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 60,
    height: 50,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTextStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  },
});

export default ButtonLogOut;
