import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonSend = ({title, onPress}) => {
  const {color, greyScale, btnTextStyle} = styles;

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
      <Pressable onPress={onPress}
      style={greyScale.btnContainerStyle}
      android_ripple={{color: '#919191'}}
      >
          <Text style={btnTextStyle}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  greyScale: {    
    btnContainerStyle: {
        width: 100,
        height: 52,
        backgroundColor: '#C4C4C4',
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
