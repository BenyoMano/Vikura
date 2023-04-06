/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, StyleSheet, Animated, Platform} from 'react-native';

const Button = props => {
  const {greyScale, btnTextStyle} = styles;
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

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable
        onPress={props.onPress}
        onPressIn={fadeIn}
        onPressOut={fadeOut}>
        <Animated.View
          style={[
            greyScale.btnContainerStyle,
            {
              opacity: animated,
            },
          ]}>
          <Text style={btnTextStyle}>{props.title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    btnContainerStyle: {
      backgroundColor: '#C4C4C4',
      paddingVertical: 18,
      width: 230,
      borderRadius: 12,
    },
  },
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  },
});

export default Button;
