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
import {AddUserScreenHeaderView} from '../Header/AddUserScreenHeaderView';

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
            styles.mainContainer,
            {
              flexDirection: 'column',
            },
          ]}>
          {/* <HeaderView
            navigation={navigation}
            hasAddedUser={hasAddedUser}
            setHasAddedUser={setHasAddedUser}
          /> */}
          <AddUserScreenHeaderView navigation={navigation} />
          <MainText
            title="Skapa konto:"
            style={{
              fontSize: 18,
              color: 'grey',
              top: 0,
              marginTop: 30,
              marginBottom: 5,
            }}
          />
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
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    width: '100%',
    paddingBottom: 15,
    borderRadius: 20,
  },
});

export default AddUserScreen;
