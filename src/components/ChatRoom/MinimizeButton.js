import React from 'react';
import {Easing} from 'react-native';
import {Animated} from 'react-native';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const LogoutButton = ({setMsgLimit, flatListRef}) => {

  const {btnContainerStyle, rightSideStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const arrowDownTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 2],
  });
  const arrowUpTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, -2],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
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

  const animatedArrowDownTransform = {
    transform: [{translateY: arrowDownTranslate}],
    zIndex: 1,
  };
  const animatedArrowUpTransform = {
    transform: [{translateY: arrowUpTranslate}],
    zIndex: 1,
  };

  return (
    <View>
      <Pressable
        onPress={ () => {
          setMsgLimit(0);
          flatListRef.current.scrollToOffset({animated: true, offset: 5000});
          }
        }
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={btnContainerStyle}>
        <Animated.View style={[animatedArrowDownTransform]}>
          <Icon name="arrow-down" type="ionicon" color="black" size={19} paddingTop={2} />
        </Animated.View>
        <Animated.View style={[animatedArrowUpTransform]}>
          <Icon name="arrow-up" type="ionicon" color="black" size={19} paddingBottom={2} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 40,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
  },
});

export default LogoutButton;
