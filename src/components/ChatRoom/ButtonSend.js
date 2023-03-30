import React from 'react';
import {Text, View, Pressable, StyleSheet, Animated} from 'react-native';

const ButtonSend = ({title, onPress}) => {
  const {viewStyle, greyScale, btnTextStyle} = styles;
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
    <View style={viewStyle}>
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={onPress}
        //</View>android_ripple={{color: '#919191'}}
      >
        <Animated.View
          style={[
            greyScale.btnContainerStyle,
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
  },
  greyScale: {
    btnContainerStyle: {
      width: 100,
      height: 52,
      backgroundColor: 'lightgrey',
      borderRadius: 12,
      justifyContent: 'center',
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

export default ButtonSend;
