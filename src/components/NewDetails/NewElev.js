import React, {useState, useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '.././Header/HeaderView';

const NewElev = ({navigation}) => {
  const [newDetails, setNewDetails] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const security = false;
  const capitalize = 'none';
  const {password, rePassword, alias} = newDetails;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
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

  async function renewDetails() {
    if (rePassword === password) {
      await auth()
        .currentUser.updatePassword(newDetails.password)
        .then(() => {
          console.log('Password updated');
        })
        .catch(error => {
          if (error.code === 'auth/weak-password') {
            console.log('Weak password');
          }
          if (error.code === 'auth/requires-recent-login') {
            console.log('You have to reauthenticate');
          }
          console.error(error);
        });

      await auth()
        .currentUser.updateProfile({
          displayName: alias,
        })
        .then(() => {
          console.log('Nytt nickname', alias);
        });
    } else {
      console.log('Lösenordet matchar inte!');
    }

    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();
        console.log('Current Data:', currentData);
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            ...currentData,
            firstLogin: false,
            alias: alias,
          });
      });
  }

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
            {isKeyboardVisible === false ? (
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
            ) : null}
          </View>
          <View style={{flex: 2}}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <InputBarNewDetails
                title="Ange nytt lösenord:"
                security={true}
                keys={'password'}
                value={password}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
              />
              <InputBarNewDetails
                title="Repetera lösenord:"
                security={true}
                keys={'rePassword'}
                value={rePassword}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
              />
              <InputBarNewDetails
                title="Ange ett nickname:"
                capitalize="words"
                keys={'alias'}
                value={alias}
                newDetails={newDetails}
                setNewDetails={setNewDetails}
              />
            </ScrollView>
          </View>
          <View style={{marginBottom: 10}}>
            <Button title="Bekräfta" onPress={() => renewDetails()} />
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
    // alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default NewElev;
