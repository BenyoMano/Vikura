import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const Button = props => {
  const {btnContainerStyle, pressedBtnContainerStyle, btnTextStyle} = styles;
  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={btnContainerStyle}
      android_ripple={{color: '#b5dfb7'}}
      >
          <Text style={btnTextStyle}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    // backgroundColor: '#C4C4C4',
    backgroundColor: '#85ad87',
    paddingVertical: 18,
    width: 230,
    borderRadius: 12,
  },
  pressedBtnContainerStyle: {
    // backgroundColor: 'green',
    paddingVertical: 18,
    width: 230,
    borderRadius: 12,
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
