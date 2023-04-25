import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Button from '../../atoms/Button';
import MainText from '../../atoms/MainText';
import InputBarNewDetails from './InputBarNewDetails';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import newDetailsElev from '../../firebase/newDetailsElev';
import {DotsLoader} from 'react-native-indicator';

const NewClient = ({navigation}) => {
  const [newDetails, setNewDetails] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {password, rePassword, alias} = newDetails;
  const ref_input2 = useRef();
  const ref_input3 = useRef();
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
          <View style={{marginTop: 40, marginBottom: 50}}>
            <MainText
              title="Välkommen!"
              style={{fontSize: 38, color: 'black'}}
            />
          </View>
          {!isKeyboardVisible ? (
            <View style={{ backgroundColor: 'transparent'}}>
              <MainText
                title="Första gången du loggar in behöver du skapa ett nytt lösenord samt ett nickname för att det ska kännas mer personligt."
                style={{
                  fontSize: 19,
                  color: '#7f7f7f',
                  marginBottom: 40,
                  paddingHorizontal: 40,
                }}
              />
            </View>
          ) : null}
          
          <View style={{flex: 2}}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
                blurOnSubmit={false}
                title="Repetera lösenord:"
                returnKeyType="next"
                security={true}
                keys={'rePassword'}
                value={rePassword}
                ref={ref_input2}
                onSubmitEditing={() => ref_input3.current.focus()}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
                />
              <InputBarNewDetails
                autoFocus={false}
                blurOnSubmit={true}
                title="Ange ett nickname:"
                capitalize="words"
                keys={'alias'}
                value={alias}
                ref={ref_input3}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
                />
            </ScrollView>
          </View>
            {loading ? (
              <View style={{height: 22, marginBottom: 20, marginTop: 10}}>
                <DotsLoader size={20} color={'green'} betweenSpace={20} />
              </View>
            ) : null}
          {!isKeyboardVisible ? (
            <View style={{marginBottom: 40}}>
              <Button
                title="Bekräfta"
                onPress={() => {
                  {newDetailsElev({navigation, password, rePassword, alias, setSubmitted, setLoading}); setSubmitted(true)};
                }}
              />
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
});

export default NewClient;
