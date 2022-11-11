import React, {useState, useEffect, useRef} from 'react';
import {Platform} from 'react-native';
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
import newDetailsKurator from '../../firebase/newDetailsKurator';

const NewKurator = ({navigation}) => {
  const [newDetails, setNewDetails] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const security = false;
  const capitalize = 'none';
  const {password, rePassword} = newDetails;
  const ref_input2 = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
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
          <View style={{flexDirection: 'row', width: 360}}>
            <HeaderView navigation={navigation} />
          </View>
          <View style={{flex: 1}}>
            <MainText
              title="Välkommen!"
              style={{fontSize: 38, color: 'black', top: 40}}
            />
          </View>
          <View style={{flex: 1}}>
            {/* {isKeyboardVisible === false ? ( */}
            <MainText
              title="Första gången du loggar in behöver du skapa ett nytt lösenord samt ett nickname.
                            Ditt nickname kan vara helt påhittat och är bara till för kuratorn ska kunna referera till dig."
              style={{
                fontSize: 16,
                color: '#7f7f7f',
                top: 0,
                paddingHorizontal: 40,
              }}
            />
            {/* ) : null} */}
          </View>
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
              />
            </ScrollView>
          </View>
          <View style={{marginBottom: 10}}>
            <Button
              title="Bekräfta"
              onPress={() => newDetailsKurator({password, rePassword})}
            />
            <Button
              title="Starta chatt"
              onPress={() => navigation.navigate('Kurator')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default NewKurator;
