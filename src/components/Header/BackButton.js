import React from 'react';
import {Easing} from 'react-native';
import {Animated} from 'react-native';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const BackButton = props => {
  const {backButtonContainerStyle} = styles;
  const animationProgress = new Animated.Value(0);
  const buttonTranslate = animationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const handlePressInAnimation = () => {
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutAnimation = () => {
    Animated.timing(animationProgress, {
      toValue: 0,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedTransform = {
    transform: [{translateX: buttonTranslate}],
  };

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable
        onPress={props.onPress}
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
        style={backButtonContainerStyle}>
        <Animated.View style={[animatedTransform]}>
          <Icon name="arrow-back" type="ionicon" color="black" />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainerStyle: {
    width: 65,
    height: 34,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
  },
});

export default BackButton;
