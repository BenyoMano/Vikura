/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import SmallLogo from './SmallLogo';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';
import StylingContainer from './StylingContainer';

export const AddUserScreenHeaderView = ({navigation}) => {
  return (
    <View style={styles.viewStyle}>
      <SmallLogo />
      <StylingContainer>
        {!auth().currentUser ? (
          <LogoutButton
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />
        ) : auth().currentUser ? (
          <BackButton onPress={() => navigation.goBack()} />
        ) : null}
      </StylingContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    width: '88%',
    alignItems: 'center',
    marginTop: '12%',
  },
});
