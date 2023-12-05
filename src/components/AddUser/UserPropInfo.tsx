import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

type UserPropInfoProps = {
  userProp: string;
};

export const UserPropInfo: React.FC<UserPropInfoProps> = ({userProp}) => {
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
  } as ViewStyle,
  textStyling: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});
