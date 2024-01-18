import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TextStyle,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../../../Header/HeaderView';
import MainText from '../../../../atoms/MainText';
import {StackParamList} from '../../../../../App';
import {RouteProp} from '@react-navigation/native';
import SendIssueButton from './SendIssueButton';

type HelpcenterScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'HelpcenterScreen'
>;

export type HCSettingsChoice = 'problem' | 'opinion';

type HelpcenterRouteProp = RouteProp<StackParamList, 'HelpcenterScreen'>;

type HelpcenterScreenProps = {
  navigation: HelpcenterScreenNavigationProp;
  route: HelpcenterRouteProp;
};

const HelpcenterScreen: React.FC<HelpcenterScreenProps> = ({
  navigation,
  route,
}) => {
  const settingsChoice = route.params.settingsChoice;
  const translateSettingsChoice = (level: HCSettingsChoice): string => {
    const translations = {
      problem: 'Hjälpcenter',
      opinion: 'Hjälpcenter',
    };
    return translations[level];
  };

  const [messageToSend, setMessageToSend] = useState('');
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
  }, [settingsChoice]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screenContainer}>
        <HeaderView navigation={navigation} />
        <Animated.View
          style={[
            styles.headerContainer,
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
        <MainText
          title={
            settingsChoice === 'problem'
              ? 'Har du problem med appen?'
              : 'Vet du något som skulle göra den här appen bättre?'
          }
          style={{
            fontSize: 22,
            color: 'black',
            marginVertical: 20,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}
        />
        <MainText
          title={
            settingsChoice === 'problem'
              ? 'Fyll i formuläret så hjälper vi dig:'
              : 'Dela med dig av din åsikt nedan:'
          }
          style={{
            fontSize: 16,
            color: 'black',
            marginBottom: 20,
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={messageToSend => setMessageToSend(messageToSend)}
            value={messageToSend}
            autoFocus={false}
            multiline
            placeholder="Beskriv med egna ord..."
            placeholderTextColor="#4F4F4F"
            textBreakStrategy="simple"
            underlineColorAndroid="transparent"
          />
        </View>
        <SendIssueButton
          title="Skicka"
          settingsChoice={settingsChoice}
          messageToSend={messageToSend}
          setMessageToSend={setMessageToSend}
        />
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  } as ViewStyle,
  inputStyle: {
    textAlignVertical: 'top',
    flex: 1,
    width: '100%',
    color: 'black',
    backgroundColor: '#EEEEEE',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
  } as TextStyle,
  headerContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
});

export default HelpcenterScreen;
