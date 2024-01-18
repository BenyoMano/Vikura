import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle, Animated, Easing} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../../../Header/HeaderView';
import MainText from '../../../../atoms/MainText';
import {StackParamList} from '../../../../../App';
import {RouteProp} from '@react-navigation/native';
import DocumentView from './DocumentView';

type EulaAndPolicyScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'EulaAndPolicyScreen'
>;

export type EAPSettingsChoice = 'eula' | 'policy';

type EulaAndPolicyRouteProp = RouteProp<StackParamList, 'EulaAndPolicyScreen'>;

type EulaAndPolicyScreenProps = {
  navigation: EulaAndPolicyScreenNavigationProp;
  route: EulaAndPolicyRouteProp;
};

const EulaAndPolicyScreen: React.FC<EulaAndPolicyScreenProps> = ({
  navigation,
  route,
}) => {
  const settingsChoice = route.params.settingsChoice;

  const translateSettingsChoice = (level: EAPSettingsChoice): string => {
    const translations = {
      eula: 'Användarvilkor',
      policy: 'Sekretesspolicy',
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
    fadeInAnim.start();

    return () => {
      fadeInAnim.stop();
      animatedValue1.setValue(0);
    };
  }, [settingsChoice]);

  return (
    <View style={styles.screenContainer}>
      <HeaderView navigation={navigation} />
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeInterpolate,
          },
        ]}>
        <MainText
          title={translateSettingsChoice(settingsChoice)}
          style={{
            fontSize: 22,
            color: 'black',
          }}
        />
      </Animated.View>
      <DocumentView settingsChoice={settingsChoice} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
});

export default EulaAndPolicyScreen;
