import React from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';

const CopyButton = props => {
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
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  }

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable 
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={btnContainerStyle}
      >
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name="copy" type="font-awesome" color="black" size={28} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightblue',
    justifyContent: 'center',
  },
});

export default CopyButton;
