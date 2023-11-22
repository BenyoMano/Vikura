import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const UserPropInfo = ({userProp}) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyling}>{userProp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginLeft: 5,
    marginTop: 5,
  },
  textStyling: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'NunitoSans-Regular',
  },
});
