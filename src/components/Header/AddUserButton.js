import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const AddUserButton = props => {
  const {btnContainerStyle} = styles;
  return (
    <Pressable onPress={props.onPress}>
      <View style={btnContainerStyle}>
        <Icon name="adduser" type="antdesign" color="black" size={35} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 65,
    height: 59,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 33,
    marginBottom: 0,
    borderColor: '#166C1B',
    justifyContent: 'center',
  },
});

export default AddUserButton;
