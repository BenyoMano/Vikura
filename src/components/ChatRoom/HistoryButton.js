import React from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = ({msgLimit, setMsgLimit, flatListRef}) => {
  const {btnContainerStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-20deg', '20deg'],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  }

  return (
    <View>
      <Pressable 
      onPress={() => {
        setMsgLimit(msgLimit + 15);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={btnContainerStyle}
      >
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name="history" type="materialicons" color="" size={28} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
  },
});

export default Button;
