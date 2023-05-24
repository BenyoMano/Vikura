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
import InputBarLogIn from './InputBarLogIn';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import signIn from '../../firebase/signIn';
import {DotsLoader} from 'react-native-indicator';
import MainText from '../../atoms/MainText';

const HomeScreen = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const {mejl, password} = loginDetails;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref_input2 = useRef();

  
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
            styles.mainContainer,
            {
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
            }}>
            <MainLogo />
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
            <View style={styles.logincontainer}>
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
  logincontainer: {
    width: '80%',
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
