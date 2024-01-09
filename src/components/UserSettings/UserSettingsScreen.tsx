import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle, Animated, Easing} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../Header/HeaderView';
import MainText from '../../atoms/MainText';
import {StackParamList} from '../../../App';
import SettingsMenu from './SettingsMenu';

type UserSettingsScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'UserSettingsScreen'
>;

type UserSettingsScreenProps = {
  navigation: UserSettingsScreenNavigationProp;
};

export type SettingsLevel =
  | 'settings'
  | 'account'
  | 'helpcenter'
  | 'eulaAndPolicy';

const UserSettingsScreen: React.FC<UserSettingsScreenProps> = ({
  navigation,
}) => {
  const [settingsLevel, setSettingsLevel] = useState<SettingsLevel>('settings');

  const translateSettingsLevel = (level: SettingsLevel): string => {
    const translations = {
      settings: 'Inställningar',
      account: 'Konto',
      helpcenter: 'Hjälpcenter',
      eulaAndPolicy: 'Användarvilkor & sekretesspolicy',
    };
    return translations[level];
  };

  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));

  const fadeInAnim = Animated.timing(animatedValue1, {
    toValue: 1,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const fadeInterpolate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    fadeInAnim.start(() => {});

    return () => {
      fadeInAnim.stop();
      animatedValue1.setValue(0);
    };
  }, [settingsLevel]);

  return (
    <View style={[styles.screenContainer, {flexDirection: 'column'}]}>
      <HeaderView navigation={navigation} />
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeInterpolate,
          },
        ]}>
        <MainText
          title={translateSettingsLevel(settingsLevel)}
          style={{
            fontSize: 22,
            color: 'black',
          }}
        />
      </Animated.View>
      <View style={styles.settingsContainer}>
        <SettingsMenu
          settingsLevel={settingsLevel}
          setSettingsLevel={setSettingsLevel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  settingsContainer: {
    flex: 1,
    width: '90%',
    paddingVertical: 20,
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
});

export default UserSettingsScreen;
