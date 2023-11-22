/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import InputBarLogIn from './InputBarLogIn';

const LoginForm = ({
  mejl,
  password,
  loginDetails,
  setLoginDetails,
  submitted,
}) => {
  const ref_input2 = useRef();

  return (
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
  );
};

const styles = StyleSheet.create({
  logincontainer: {
    width: '80%',
  },
});

export default LoginForm;
