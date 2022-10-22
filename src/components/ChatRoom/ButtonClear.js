import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonClear = props => {
  const {btnContainerStyle, btnTextStyle} = styles;

  return (
    <Pressable onPress={props.onPress}>
      <View style={btnContainerStyle}>
        <Text style={btnTextStyle}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 0,
    width: 60,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  },
});

export default ButtonClear;
