import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
  TextInput,
} from 'react-native';
import Button from '../../atoms/Button';
import MainText from '../../atoms/MainText';
import InputBarNewDetails from './InputBarNewDetails';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import newDetailsKurator from '../../firebase/newDetailsKurator';
import {DotsLoader} from 'react-native-indicator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../..';
import {NewDetailsProps} from './NewClientScreen';

type NewKuratorScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'NewKuratorScreen'
>;

type NewKuratorScreenProps = {
  navigation: NewKuratorScreenNavigationProp;
};

const NewKuratorScreen: React.FC<NewKuratorScreenProps> = ({navigation}) => {
  const [newDetails, setNewDetails] = useState<NewDetailsProps>({
    password: '',
    rePassword: '',
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {password, rePassword} = newDetails;
  const ref_input2 = useRef<TextInput>(null);
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
        <View style={styles.container}>
          <HeaderView navigation={navigation} />
          <View style={{marginTop: '10%'}}>
            <MainText
              title="Välkommen!"
              style={{fontSize: 38, color: 'black'}}
            />
          </View>
          <View style={styles.contentContainer}>
            {!isKeyboardVisible ? (
              <View style={{backgroundColor: 'transparent'}}>
                <MainText
                  title="Första gången du loggar in behöver du skapa ett nytt lösenord."
                  style={{
                    fontSize: 19,
                    color: '#7f7f7f',
                    marginTop: 40,
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
                placeholder="Ange nytt lösenord:"
                returnKeyType="next"
                secureTextEntry={true}
                keys={'password'}
                value={password}
                onSubmitEditing={() => ref_input2.current?.focus()}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
              />
              <InputBarNewDetails
                autoFocus={false}
                blurOnSubmit={true}
                placeholder="Repetera lösenord:"
                secureTextEntry={true}
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
          <Button
            title="Bekräfta"
            onPress={() => {
              newDetailsKurator({
                navigation,
                password,
                rePassword,
                setSubmitted,
                setLoading,
              });
              setSubmitted(true);
            }}
          />
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
  } as ViewStyle,
  loginContainer: {
    width: '80%',
    paddingTop: 40,
  } as ViewStyle,
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

export default NewKuratorScreen;
