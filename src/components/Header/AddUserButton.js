import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const AddUserButton = props => {
  const {btnContainerStyle} = styles;
  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable onPress={props.onPress}
      style={btnContainerStyle}
      android_ripple={{color: '#e3e1e1'}}
      >
          <Icon name="adduser" type="antdesign" color="black" size={35} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 65,
    height: 59,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#166C1B',
    justifyContent: 'center',
  },
});

export default AddUserButton;
