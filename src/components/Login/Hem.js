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
import { DotsLoader } from 'react-native-indicator';

const Hem = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({});
  const security = false;
  const {mejl, password} = loginDetails;
  const ref_input2 = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.greyScale.container,
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
            <View style={styles.greyScale.logincontainer}>
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
          <View style={{height: 22, marginBottom: 40, marginTop: 10}}>
            {loading ? <DotsLoader size={20} color={"green"} betweenSpace={20} /> : null }
          </View>
          <View style={{flex: 0.3}}>
            <Button
              title="Logga in"
              onPress={() =>
                signIn({loginDetails, setLoginDetails, navigation, setLoading})}
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
      width: '90%',
      paddingHorizontal: 20,
      margingBottom: 50,
      paddingBottom: 20,
      backgroundColor: '#d9d9d9',
      borderRadius: 20,
    },
  },
  contcont: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hem;
