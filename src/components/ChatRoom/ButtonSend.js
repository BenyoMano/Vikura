import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonSend = ({title, onPress}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={onPress}
      style={btnContainerStyle}
      android_ripple={{color: '#b5dfb7'}}
      >
          <Text style={btnTextStyle}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 100,
    height: 52,
    backgroundColor: '#85ad87',
    borderRadius: 12,
    justifyContent: 'center',
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
