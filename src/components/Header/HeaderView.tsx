import React, {useContext, useState} from 'react';
import {View, StyleSheet, ViewStyle, Platform} from 'react-native';
import SmallLogo from './SmallLogo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import LogoutButton from './LogoutButton';
import StylingContainer from './StylingContainer';
import AdjustSizeButton from './AdjustSizeButton/AdjustSizeButton';
import {ThemeAndSizePicker} from './ThemeAndSizePicker/ThemeAndSizePicker';

type HeaderViewProps = {
  navigation: any;
  clientUserId?: string;
};

export const HeaderView: React.FC<HeaderViewProps> = ({
  navigation,
  clientUserId,
}) => {
  const route = useRoute();
  const [isToggled, setIsToggled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contextValue = useContext(IsCurrentUserKuratorContext);
  const isCurrentUserKurator = contextValue?.isCurrentUserKurator;
  const isCurrentUserAdmin = contextValue?.isCurrentUserAdmin;

  const platformStyle =
    Platform.OS === 'android'
      ? {
          marginTop: '12%',
        }
      : {marginTop: '15%'};

  return (
    <View style={[styles.viewStyle, platformStyle]}>
      <SmallLogo />
      {route.name === 'KuratorScreen' ? (
        <StylingContainer>
          <LogoutButton
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
              setIsVisible={setIsVisible}
            />
            {isVisible && (
              <ThemeAndSizePicker
                isToggled={isToggled}
                setIsVisible={setIsVisible}
              />
            )}
          </View>
        </StylingContainer>
      ) : route.name === 'ChatScreen' && !isCurrentUserKurator ? (
        <StylingContainer>
          <LogoutButton
            onPress={() => {
              signOut();
              navigation.navigate('HomeScreen');
            }}
          />
          <View style={styles.adjustSize}>
            <AdjustSizeButton
              isToggled={isToggled}
              setIsToggled={setIsToggled}
              setIsVisible={setIsVisible}
            />
            {isVisible && (
              <ThemeAndSizePicker
                isToggled={isToggled}
                setIsVisible={setIsVisible}
              />
            )}
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
    zIndex: 10,
  } as ViewStyle,
  adjustSize: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  } as ViewStyle,
});
