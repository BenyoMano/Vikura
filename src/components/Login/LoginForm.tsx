import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import InputBarLogIn from './InputBarLogIn';

const LoginForm = ({
  mail,
  password,
  loginDetails,
  setLoginDetails,
  submitted,
  handleLogin,
}) => {
  const ref_input2 = useRef<TextInput>(null);

  return (
    <View style={styles.logincontainer}>
      <InputBarLogIn
        autoFocus={false}
        blurOnSubmit={false}
        title="E-postadress"
        keyboardType="email-address"
        returnKeyType="next"
        keys={'mail'}
        value={mail}
        onSubmitEditing={() => ref_input2.current?.focus()}
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
        submitted={submitted}
      />
      <InputBarLogIn
        title="Lösenord"
        secureTextEntry={true}
        returnKeyType="done"
        keys={'password'}
        value={password}
        ref={ref_input2}
        onSubmitEditing={handleLogin}
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
