import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const ButtonSend = ({title, onPress}) => {
  const {viewStyle, greyScale, btnTextStyle} = styles;

  return (
    <View style={viewStyle}>
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
  viewStyle: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // width: '100%',
    // left: '-200%',
    borderRadius: 12, 
    overflow: 'hidden',
    borderWidth: 2, 
  },
  greyScale: {    
    btnContainerStyle: {
        width: 100,
        // width: '100%',
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
