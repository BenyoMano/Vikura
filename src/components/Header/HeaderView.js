/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from './Logo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import ButtonLogOut from './ButtonLogOut';
import {useContext} from 'react';
import {IsKuratorContext} from '../../firebase/isKuratorContext';

export const HeaderView = ({navigation, clientUserId, user, refPath}) => {
  const route = useRoute();
  const isKurator = useContext(IsKuratorContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '88%',
        alignItems: 'center',
        marginTop: '7%',
      }}>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          right: '50%',
        }}>
        <Logo style={{width: 90, height: 35}} />
      </View>

      {route.name === 'KuratorView' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <ButtonLogOut
              title="Logga Ut"
              onPress={() => {
                signOut();
                navigation.navigate('Hem');
              }}
            />
          </View>
          <View>
            <AddUserButton onPress={() => navigation.navigate('AddUserView')} />
          </View>
        </View>
      ) : route.name === 'AddUserView' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'NewKurator' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'NewElev' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ReportConcern' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ChatView' && isKurator ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          {/* <View style={{position: 'absolute', right: '15%'}}>
            <ButtonClear title="Clear" onPress={() => clearMessages({user, refPath})} />
          </View> */}
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
      ) : route.name === 'ChatView' && !isKurator ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ButtonLogOut
            title="Logga Ut"
            onPress={() => {
              signOut();
              navigation.navigate('Hem');
            }}
          />
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
