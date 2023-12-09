import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
} from 'react-native';
import Button from '../../atoms/Button';
import MainLogo from '../Header/MainLogo';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import signIn from '../../firebase/signIn';
import {DotsLoader} from 'react-native-indicator';
import MainText from '../../atoms/MainText';
import LoginForm from './LoginForm';
import {MotiView} from 'moti';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../..';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'HomeScreen'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    mejl: '',
    password: '',
  });
  const {mejl, password} = loginDetails;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = () => {
    setSubmitted(true);
    signIn({
      loginDetails,
      setLoginDetails,
      navigation,
      setLoading,
      setSubmitted,
    });
  };

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer} testID="homescreen">
          <MainLogo />
          <View style={styles.contentContainer}>
            <MotiView
              animate={{
                scale: !isKeyboardVisible ? 1 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 100,
              }}>
              <MainText
                title="Välkommen!"
                style={{fontSize: 30, color: 'black'}}
              />
            </MotiView>
            <LoginForm
              mejl={mejl}
              password={password}
              loginDetails={loginDetails}
              setLoginDetails={setLoginDetails}
              submitted={submitted}
              handleLogin={handleLogin}
            />
          </View>
          <View style={styles.dotsLoader}>
            {loading ? (
              <DotsLoader size={20} color={'green'} betweenSpace={20} />
            ) : null}
          </View>
          <View style={{flex: 0.2}}>
            <Button title="Logga in" onPress={handleLogin} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  } as ViewStyle,
  contentContainer: {
    flex: 0.4,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  } as ViewStyle,
  dotsLoader: {
    height: 22,
    marginBottom: 40,
    marginTop: 10,
  } as ViewStyle,
});

export default HomeScreen;
