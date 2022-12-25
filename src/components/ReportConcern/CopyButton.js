import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = props => {
  const {btnContainerStyle} = styles;
  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={btnContainerStyle}
      android_ripple={{color: 'lightblue'}}
      >
        <Icon name="copy" type="font-awesome" color="black" size={28} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightblue',
    justifyContent: 'center',
  },
});

export default Button;
