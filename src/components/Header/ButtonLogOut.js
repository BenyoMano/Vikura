import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonLogOut = ({title, onPress}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
  return (
    <Pressable onPress={onPress}>
      <View style={btnContainerStyle}>
        <Text style={btnTextStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 110,
    height: 38,
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
