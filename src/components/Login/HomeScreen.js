/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../../atoms/Button';
import Logo from '../Header/Logo';
import InputBarLogIn from './InputBarLogIn';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import signIn from '../../firebase/signIn';
import {DotsLoader} from 'react-native-indicator';
import MainText from '../../atoms/MainText';
import { useEffect } from 'react';

const HomeScreen = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {mejl, password} = loginDetails;
  const ref_input2 = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        <View
          style={[
            styles.greyScale.container,
            {
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
            }}>
            <Logo style={{width: 220, height: 82, marginTop: 60}} />
          </View>
          <View style={styles.contcont}>
            {!isKeyboardVisible ? (
              <View style={{ backgroundColor: 'transparent'}}>
                <MainText
                title="Välkommen!"
                style={{fontSize: 30, color: 'black'}}
                />
              </View>
            ) : null}
            <View style={styles.greyScale.logincontainer}>
              <InputBarLogIn
                autoFocus={false}
                blurOnSubmit={false}
                title="E-postadress"
                keyType="email-address"
                returnKeyType="next"
                keys={'mejl'}
                value={mejl}
                onSubmitEditing={() => ref_input2.current.focus()}
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
                submitted={submitted}
              />
              <InputBarLogIn
                title="Lösenord"
                security={true}
                keys={'password'}
                value={password}
                ref={ref_input2}
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
                submitted={submitted}
              />
            </View>
          </View>
          <View style={{height: 22, marginBottom: 40, marginTop: 10}}>
            {loading ? (
              <DotsLoader size={20} color={'green'} betweenSpace={20} />
            ) : null}
          </View>
          <View style={{flex: 0.2}}>
            <Button
              title="Logga in"
              onPress={() => {
                signIn({
                  loginDetails,
                  setLoginDetails,
                  navigation,
                  setLoading,
                  setSubmitted,
                });
                setSubmitted(true);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    container: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#EEEEEE',
    },
    logincontainer: {
      width: '80%',
    },
  },
  contcont: {
    flex: 0.4,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
