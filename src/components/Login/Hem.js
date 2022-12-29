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

const Hem = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({});
  const security = false;
  const {mejl, password} = loginDetails;
  const ref_input2 = useRef();

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'flex-end'
            }}>
            <Logo style={{width: 160, height: 62, marginTop: 30}} />
          </View>
          <View style={styles.contcont}>
            <View style={styles.logincontainer}>
              <InputBarLogIn
                autoFocus={false}
                blurOnSubmit={false}
                title="Mejl:"
                keyType="email-address"
                returnKeyType="next"
                keys={'mejl'}
                value={mejl}
                onSubmitEditing={() => ref_input2.current.focus()}
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
              />
              <InputBarLogIn
                title="Kod:"
                security={true}
                keys={'password'}
                value={password}
                ref={ref_input2}
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
              />
            </View>
          </View>
          <View style={{flex: 0.5}}>
            <Button
              title="Logga in"
              onPress={() =>
                signIn({loginDetails, setLoginDetails, navigation})
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f7e0b5',
    width: '100%'
  },
  logincontainer: {
    paddingHorizontal: 20,
    margingBottom: 50,
    paddingBottom: 20,
    backgroundColor: '#85ad87',
    // backgroundColor: '#94af8f',
    // backgroundColor: '#8b9d77'
    borderRadius: 20,
  },
  contcont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hem;
