import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from './Logo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import ButtonLogOut from './ButtonLogOut';

export const HeaderView = ({navigation, kurator, clientUserId, children, user, refPath}) => {
  const route = useRoute();
  console.log('Route Name:', route.name);

  return (
    <View style={{flexDirection: 'row', width: 360}}>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          right: '50%',
        }}>
        <Logo style={{width: 90, height: 35, marginTop: 32, marginBottom: 10}} />
      </View>

      {route.name === 'KuratorView' ? (
        <View style={{flexDirection: 'row', width: 360, marginBottom: 60}}>
          <View style={{position: 'absolute', left: '0%', marginTop: 32}}>
            <ButtonLogOut
              title="Logga Ut"
              onPress={() => {
                signOut();
                navigation.navigate('Hem');
              }}
            />
          </View>
          <View style={{position: 'absolute', left: '80%', marginTop: 33}}>
            <AddUserButton onPress={() => navigation.navigate('AddUserView')} />
          </View>
        </View>
      ) : route.name === 'AddUserView' ? (
        <View style={{flexDirection: 'row', width: 360, marginTop: 33}}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'NewKurator' ? (
        <View style={{flexDirection: 'row', width: 360, marginTop: 33}}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'NewElev' ? (
        <View style={{flexDirection: 'row', width: 360, marginTop: 33}}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ReportConcern' ? (
        <View style={{flexDirection: 'row', width: 360, marginTop: 33}}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ChatView' && kurator ? (
        <View style={{flexDirection: 'row', width: 360, marginTop: 33}}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          <View style={{position: 'absolute', right: '15%'}}>
            <ButtonClear title="Clear" onPress={() => clearMessages({user, refPath})} />
          </View>
          <View style={{position: 'absolute', right: '0%'}}>
            <ReportConcernButton
              onPress={() =>
                navigation.navigate('ReportConcern', {
                  clientUserId: clientUserId,
                })
              }
            />
          </View>
        </View>
      ) : route.name === 'ChatView' && !kurator ? (
        <View style={{flexDirection: 'row', width: 360, marginBottom: 60}}>
          <View style={{position: 'absolute', left: '0%', marginTop: 32}}>
            <ButtonLogOut
              title="Logga Ut"
              onPress={() => {
                signOut();
                navigation.navigate('Hem');
              }}
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
