/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SmallLogo from './SmallLogo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import LogoutButton from './LogoutButton';
import StylingContainer from './StylingContainer';

export const HeaderView = ({
  navigation,
  clientUserId,
  hasAddedUser,
  setHasAddedUser,
}) => {
  const route = useRoute();
  const {isCurrentUserKurator, isCurrentUserAdmin} = useContext(
    IsCurrentUserKuratorContext,
  );

  return (
    <View style={styles.viewStyle}>
      <SmallLogo />
      {route.name === 'KuratorScreen' ? (
        <StylingContainer>
          <LogoutButton
            title="Logga Ut"
            onPress={() => {
              signOut();
              navigation.navigate('HomeScreen');
            }}
          />
          {isCurrentUserAdmin ? (
            <AddUserButton
              onPress={() => navigation.navigate('AddUserScreen')}
              testID="adduserbutton"
            />
          ) : null}
        </StylingContainer>
      ) : route.name === 'AddUserScreen' ? (
        <StylingContainer>
          {hasAddedUser === true ? (
            <LogoutButton
              onPress={() => {
                signOut();
                navigation.navigate('HomeScreen');
                setHasAddedUser(false);
              }}
            />
          ) : hasAddedUser === false ? (
            <BackButton onPress={() => navigation.goBack()} />
          ) : null}
        </StylingContainer>
      ) : route.name === 'NewKuratorScreen' ? (
        <StylingContainer>
          <BackButton onPress={() => navigation.goBack()} />
        </StylingContainer>
      ) : route.name === 'NewClientScreen' ? (
        <StylingContainer>
          <BackButton onPress={() => navigation.goBack()} />
        </StylingContainer>
      ) : route.name === 'ReportConcernScreen' ? (
        <StylingContainer>
          <BackButton onPress={() => navigation.goBack()} />
        </StylingContainer>
      ) : route.name === 'ChatScreen' && isCurrentUserKurator ? (
        <StylingContainer>
          <BackButton onPress={() => navigation.goBack()} />
          {/* <View style={{position: 'absolute', right: '15%'}}>
            <ButtonClear title="Clear" onPress={() => clearMessages({user, refPath})} />
          </View> */}
          <ReportConcernButton
            onPress={() =>
              navigation.navigate('ReportConcernScreen', {
                clientUserId: clientUserId,
              })
            }
          />
        </StylingContainer>
      ) : route.name === 'ChatScreen' && !isCurrentUserKurator ? (
        <StylingContainer>
          <LogoutButton
            title="Logga Ut"
            onPress={() => {
              signOut();
              navigation.navigate('HomeScreen');
            }}
          />
        </StylingContainer>
      ) : null}
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
