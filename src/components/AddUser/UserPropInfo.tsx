import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

type UserPropInfoProps = {
  userProp: string;
};

export const UserPropInfo: React.FC<UserPropInfoProps> = ({userProp}) => {
  const backgroundColor =
    userProp === 'JA' ? '#5CB85C' : userProp === 'NEJ' ? '#D9534F' : '';

  const indicatorStyle = {
    width: 17,
    height: 17,
    borderRadius: 20,
    marginLeft: 8,
    backgroundColor: backgroundColor,
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyling}>{userProp}</Text>
      {userProp === 'NEJ' ? (
        <View style={indicatorStyle} />
      ) : userProp === 'JA' ? (
        <View style={indicatorStyle} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginLeft: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  textStyling: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});
