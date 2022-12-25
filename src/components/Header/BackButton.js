import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = props => {
  const {btnContainerStyle} = styles;
  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={btnContainerStyle}
      android_ripple={{color: '#e3e1e1'}}
      >
          <Icon name="arrow-back" type="ionicon" color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 65,
    height: 34,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
  },
});

export default Button;
