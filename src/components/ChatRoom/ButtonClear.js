import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonClear = ({title, onPress}) => {
  const {btnContainerStyle, btnTextStyle} = styles;

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={onPress}
      android_ripple={{color: '#b5dfb7'}}>
        <View style={btnContainerStyle}>
          <Text style={btnTextStyle}>{title}</Text>
        </View>
      </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    backgroundColor: '#85ad87',
    paddingVertical: 0,
    width: 60,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
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
