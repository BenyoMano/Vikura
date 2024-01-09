import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../../Header/HeaderView';
import MainText from '../../../atoms/MainText';
import {StackParamList} from '../../../../App';
import {RouteProp} from '@react-navigation/native';
import WebView from 'react-native-webview';

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
  const [isLoading, setLoading] = useState(false);
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
          title={translateSettingsChoice(settingsChoice)}
          style={{
            fontSize: 22,
            color: 'black',
          }}
        />
      </Animated.View>
      <View style={styles.boxContainer}>
        {settingsChoice === 'eula' ? (
          <View style={{flex: 1}}>
            <WebView
              onLoadProgress={({nativeEvent}) => {
                console.log('NativeEvent', nativeEvent.progress);
                if (nativeEvent.progress !== 1 && !isLoading) {
                  setLoading(true);
                } else if (nativeEvent.progress === 1) {
                  setLoading(false);
                }
              }}
              source={{
                uri: 'https://www.termsfeed.com/live/2e00e7ce-8224-416e-ae6e-5adf222ceabe?fbclid=IwAR1YLW9rKtqYT2zFuOK805WS82VnqRSKSr9RKKq2FOzhLFztDpCpZjpbdxg',
              }}
            />
            {isLoading && <ActivityIndicator size={'large'} />}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <WebView
              onLoadProgress={({nativeEvent}) => {
                console.log('NativeEvent', nativeEvent.progress);
                if (nativeEvent.progress !== 1 && !isLoading) {
                  setLoading(true);
                } else if (nativeEvent.progress === 1) {
                  setLoading(false);
                }
              }}
              source={{
                uri: 'https://www.termsfeed.com/live/60db37d2-737a-4190-8e1c-d2cb382e32ae?fbclid=IwAR3KBnwlGaMl5rxQK7EGA2B_TdKRhyiOvrVbfYf7CXnFgUSZ0N90NIG6D8c',
              }}
            />
            {isLoading && <ActivityIndicator size={'large'} />}
          </View>
        )}
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
  boxContainer: {
    flex: 1,
    width: '88%',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 12,
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
