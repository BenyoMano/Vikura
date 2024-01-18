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
import newDetailsElev from '../../firebase/newDetailsElev';
import SuccessProtocol from '../AddUser/SuccessProtocol/SuccessProtocol';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../App';

type NewClientScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'NewClientScreen'
>;

type NewClientScreenProps = {
  navigation: NewClientScreenNavigationProp;
};

export type NewDetailsProps = {
  password: string;
  rePassword: string;
  alias?: string;
};

const NewClientScreen: React.FC<NewClientScreenProps> = ({navigation}) => {
  const [newDetails, setNewDetails] = useState<NewDetailsProps>({
    password: '',
    rePassword: '',
    alias: '',
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {password, rePassword, alias} = newDetails;
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);
  const [submitted, setSubmitted] = useState(false);
  const [successProtocol, setSuccessProtocol] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const user = auth().currentUser;

  const action1 = {
    status: 'initial',
    name: 'account-key-outline',
    type: 'material-community',
  };
  const action2 = {
    status: 'initial',
    name: 'card-account-details-outline',
    type: 'material-community',
  };

  const [actionStates, setActionStates] = useState({
    action1,
    action2,
  });

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

  useEffect(() => {
    if (allDone && user?.uid) {
      navigation.navigate('ChatScreen', {id: user?.uid});
      setTimeout(() => {
        showMessage({
          message: 'Välkommen!',
          description: 'Du kan börja chatta direkt!',
          type: 'info',
          position: 'center',
          floating: true,
          duration: 3000,
        });
      }, 1500);
    }
  }, [allDone, user]);

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {successProtocol ? (
            <SuccessProtocol
              actionStates={actionStates}
              successProtocol={successProtocol}
              setSuccessProtocol={setSuccessProtocol}
              setAllDone={setAllDone}
            />
          ) : null}
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
                  title="Första gången du loggar in behöver du skapa ett nytt lösenord samt ett nickname för att det ska kännas mer personligt."
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
                autoCapitalize="none"
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
                autoCapitalize="none"
                autoFocus={false}
                blurOnSubmit={false}
                placeholder="Repetera lösenord:"
                returnKeyType="next"
                secureTextEntry={true}
                keys={'rePassword'}
                value={rePassword}
                ref={ref_input2}
                onSubmitEditing={() => ref_input3.current?.focus()}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
              />
              <InputBarNewDetails
                autoFocus={false}
                blurOnSubmit={true}
                placeholder="Ange ett nickname:"
                autoCapitalize="words"
                keys={'alias'}
                value={alias}
                ref={ref_input3}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
                submitted={submitted}
              />
            </View>
          </View>
          <Button
            title="Bekräfta"
            onPress={() => {
              newDetailsElev({
                password,
                rePassword,
                alias,
                setSubmitted,
                setActionStates,
                setSuccessProtocol,
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
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  } as ViewStyle,
  loginContainer: {
    width: '80%',
    paddingTop: 20,
  } as ViewStyle,
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  } as ViewStyle,
});

export default NewClientScreen;
