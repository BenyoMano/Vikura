/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Button from '../../atoms/Button';
import Form from './Form';
import MainText from '../../atoms/MainText';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import {AddUserModal} from './AddUserModal';

const AddUserScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxStateKurator, setCheckboxStateKurator] = useState(false);
  const [checkboxStateAdmin, setCheckboxStateAdmin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasAddedUser, setHasAddedUser] = useState(false);
  const [userPropToAdd, setUserPropToAdd] = useState({
    firstName: '',
    secondName: '',
    mejl: '',
    password: '',
    personnummer: '',
    firstLogin: true,
    kurator: checkboxStateKurator,
    admin: checkboxStateAdmin,
  });

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.greyScale.mainContainer,
            {
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <HeaderView
              navigation={navigation}
              hasAddedUser={hasAddedUser}
              setHasAddedUser={setHasAddedUser}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <MainText
              title="Skapa konto:"
              style={{
                fontSize: 18,
                color: 'grey',
                top: 0,
                marginTop: 30,
                marginBottom: 15,
              }}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <AddUserModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              userPropToAdd={userPropToAdd}
              setUserPropToAdd={setUserPropToAdd}
              checkboxStateKurator={checkboxStateKurator}
              setCheckboxStateKurator={setCheckboxStateKurator}
              checkboxStateAdmin={checkboxStateAdmin}
              setCheckboxStateAdmin={setCheckboxStateAdmin}
              setSubmitted={setSubmitted}
              setHasAddedUser={setHasAddedUser}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.greyScale.scrollViewContainer}>
            <Form
              userPropToAdd={userPropToAdd}
              setUserPropToAdd={setUserPropToAdd}
              checkboxStateKurator={checkboxStateKurator}
              setCheckboxStateKurator={setCheckboxStateKurator}
              checkboxStateAdmin={checkboxStateAdmin}
              setCheckboxStateAdmin={setCheckboxStateAdmin}
              submitted={submitted}
            />
          </ScrollView>
          <View style={{marginVertical: 10}}>
            <Button title="Registrera" onPress={() => setModalVisible(true)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    scrollViewContainer: {
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: '#EEEEEE',
      borderRadius: 20,
      width: '100%',
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      width: '100%',
    },
  },
});

export default AddUserScreen;
