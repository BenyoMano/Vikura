import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const Button = props => {
  const {color, greyScale, btnTextStyle} = styles;

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={greyScale.btnContainerStyle}
      android_ripple={{color: '#919191'}}
      >
          <Text style={btnTextStyle}>{props.title}</Text>
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
