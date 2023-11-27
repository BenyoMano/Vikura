/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SmallLogo from './SmallLogo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import LogoutButton from './LogoutButton';
import StylingContainer from './StylingContainer';
import AdjustSizeButton from './AdjustSizeButton';
import {FontSizeSlider} from './FontSizeSlider';
import {AnimatePresence} from 'moti';

export const HeaderView = ({
  navigation,
  clientUserId,
  hasAddedUser,
  setHasAddedUser,
}) => {
  const route = useRoute();
  const [isToggled, setIsToggled] = useState(false);
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
          <View style={styles.adjustSize}>
            <ReportConcernButton
              onPress={() =>
                navigation.navigate('ReportConcernScreen', {
                  clientUserId: clientUserId,
                })
              }
            />
            <AdjustSizeButton
              isToggled={isToggled}
              setIsToggled={setIsToggled}
            />
            <AnimatePresence>{isToggled && <FontSizeSlider />}</AnimatePresence>
          </View>
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
          <View style={styles.adjustSize}>
            <AdjustSizeButton
              isToggled={isToggled}
              setIsToggled={setIsToggled}
            />
            <AnimatePresence>{isToggled && <FontSizeSlider />}</AnimatePresence>
          </View>
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
    justifyContent: 'center',
    marginTop: '12%',
  },
  adjustSize: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  },
});
