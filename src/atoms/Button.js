import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import useColorStyle from './colorStyle';

const Button = props => {
  const {color, greyScale, btnTextStyle} = styles;
  const colorStyle = useColorStyle();

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={colorStyle === true ? color.btnContainerStyle : greyScale.btnContainerStyle}
      android_ripple={{color: colorStyle === true ? '#b5dfb7' : '#919191'}}
      >
          <Text style={btnTextStyle}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  color: {    
    btnContainerStyle: {
      backgroundColor: '#85ad87',
      paddingVertical: 18,
      width: 230,
      borderRadius: 12,
    },
  },
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
