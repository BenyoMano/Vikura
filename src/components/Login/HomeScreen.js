/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../../atoms/Button';
import MainLogo from '../Header/MainLogo';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import signIn from '../../firebase/signIn';
import {DotsLoader} from 'react-native-indicator';
import MainText from '../../atoms/MainText';
import LoginForm from './LoginForm';

const HomeScreen = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
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

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <MainLogo />
          <View style={styles.contentContainer}>
            {!isKeyboardVisible ? (
              <MainText
              title="Välkommen!"
              style={{fontSize: 30, color: 'black'}}
              />
            ) : null}
            <LoginForm
              mejl={mejl}
              password={password}
              loginDetails={loginDetails}
              setLoginDetails={setLoginDetails}
              submitted={submitted}
            />
          </View>
          <View style={styles.dotsLoader}>
            {loading ? (
              <DotsLoader size={20} color={'green'} betweenSpace={20} />
            ) : null}
          </View>
          <View style={{flex: 0.2}}>
            <Button
              title="Logga in"
              onPress={() => {
                setSubmitted(true);
                signIn({
                  loginDetails,
                  setLoginDetails,
                  navigation,
                  setLoading,
                  setSubmitted,
                });
              }}
            />
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
  },
  contentContainer: {
    flex: 0.4,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dotsLoader: {
    height: 22,
    marginBottom: 40,
    marginTop: 10,
  },
});

export default HomeScreen;
