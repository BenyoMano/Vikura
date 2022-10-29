import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from './Logo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const HeaderView = ({navigation, kurator, children}) => {
  const route = useRoute();
  console.log('Route Name:', route.name);

  function signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View style={{flexDirection: 'row', width: 360}}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={{position: 'absolute', left: '50%', right: '50%'}}>
        <Logo style={{width: 90, height: 35, marginTop: 32}} />
      </View>

      {route.name === 'Kurator' ? (
        <View style={{position: 'absolute', left: '80%'}}>
          <AddUserButton onPress={() => navigation.navigate('AddUser')} />
        </View>
      ) : route.name === 'ChatView' /* && kurator === 'true' */ ? (
        <View style={{position: 'absolute', left: '67%'}}>
          <View style={{position: 'absolute', left: '-280%'}}>
            <ButtonClear
              title="Logga Ut"
              onPress={() => {
                signOut();
                navigation.navigate('Hem');
              }}
            />
          </View>
          <View>
            <ButtonClear title="Clear" onPress={() => clearMessages()} />
          </View>
          <View style={{position: 'absolute', left: '120%'}}>
            <ReportConcernButton
              onPress={() => navigation.navigate('ReportConcern')}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
