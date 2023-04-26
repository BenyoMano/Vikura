import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../../atoms/Button';
import MainText from '../../atoms/MainText';
import InputBarNewDetails from './InputBarNewDetails';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import newDetailsKurator from '../../firebase/newDetailsKurator';
import {DotsLoader} from 'react-native-indicator';

const NewKurator = ({navigation}) => {
  const [newDetails, setNewDetails] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {password, rePassword} = newDetails;
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
            styles.container,
            {
              flexDirection: 'column',
            },
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
            <HeaderView navigation={navigation} />
          </View>
          <View style={{marginTop: 40}}>
            <MainText
              title="Välkommen!"
              style={{fontSize: 38, color: 'black'}}
            />
          </View>
          <View style={styles.contentContainer}>
            {!isKeyboardVisible ? (
              <View style={{ backgroundColor: 'transparent'}}>
                <MainText
                  title="Första gången du loggar in behöver du skapa ett nytt lösenord."
                  style={{
                    fontSize: 19,
                    color: '#7f7f7f',
                    marginBottom: 40,
                    paddingHorizontal: 40,
                  }}
                />
            </View>
            ) : null}

            <View style={styles.loginContainer}>
              <InputBarNewDetails
                autoFocus={false}
                blurOnSubmit={false}
                title="Ange nytt lösenord:"
                returnKeyType="next"
                security={true}
                keys={'password'}
                value={password}
                onSubmitEditing={() => ref_input2.current.focus()}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
                />
              <InputBarNewDetails
                autoFocus={false}
                blurOnSubmit={true}
                title="Repetera lösenord:"
                security={true}
                keys={'rePassword'}
                value={rePassword}
                ref={ref_input2}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
              />
            </View>
          </View>
            {loading ? (
              <View style={{height: 22, marginBottom: 80, marginTop: 10}}>
                <DotsLoader size={20} color={'green'} betweenSpace={20} />
              </View>
            ) : null}
            <View style={{flex: 0.3}}>
              <Button
                title="Bekräfta"
                onPress={() => {newDetailsKurator({navigation, password, rePassword, setSubmitted, setLoading}); setSubmitted(true)}}
              />
            </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  loginContainer: {
    width: '80%',
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default NewKurator;
