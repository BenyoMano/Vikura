import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Button = props => {
  const {btnContainerStyle} = styles;
  return (
    <Pressable onPress={props.onPress}>
      <View style={btnContainerStyle}>
        <Icon name="arrow-back" type="ionicon" color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 65,
    height: 34,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 33,
    marginBottom: 0,
    borderColor: 'black',
    justifyContent: 'center',
  },
});

export default Button;
