import React from 'react';
import {Text, View, Pressable, StyleSheet, Animated} from 'react-native';

const SmallButton = ({title, onPress}) => {
  const {viewStyle, greyScale, btnTextStyle} = styles;
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
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={onPress}
        testID="smallbutton">
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
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      backgroundColor: 'lightgrey',
    },
  },
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
});

export default SmallButton;
