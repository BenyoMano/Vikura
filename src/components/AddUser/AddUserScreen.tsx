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
import {AddUserModal} from './AddUserModal';
import {AddUserScreenHeaderView} from '../Header/AddUserScreenHeaderView';
import SuccessProtocol from './SuccessProtocol/SuccessProtocol';

type Action = {
  status: string;
  name: String;
  type: String;
};

type ActionStates = {
  action1: Action;
  action2: Action;
  action3: Action;
  action4: Action;
};

type UserPropToAdd = {
  firstName: String;
  secondName: String;
  mejl: String;
  password: String;
  personnummer: String;
  firstLogin: Boolean;
  kurator: Boolean;
  admin: Boolean;
};

type AddUserScreenProps = {
  navigation: any;
};

const AddUserScreen: React.FC<AddUserScreenProps> = ({navigation}) => {
  const [successProtocol, setSuccessProtocol] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxStateKurator, setCheckboxStateKurator] = useState(false);
  const [checkboxStateAdmin, setCheckboxStateAdmin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userPropToAdd, setUserPropToAdd] = useState<UserPropToAdd>({
    firstName: '',
    secondName: '',
    mejl: '',
    password: '',
    personnummer: '',
    firstLogin: true,
    kurator: checkboxStateKurator,
    admin: checkboxStateAdmin,
  });

  const action1 = {
    status: 'initial',
    name: 'adduser',
    type: 'antdesign',
  };
  const action2 = {
    status: 'initial',
    name: 'card-account-details-outline',
    type: 'material-community',
  };
  const action3 = {
    status: 'initial',
    name: 'chatbubbles-outline',
    type: 'ionicon',
  };
  const action4 = {
    status: 'initial',
    name: 'log-out',
    type: 'feather',
  };

  const [actionStates, setActionStates] = useState<ActionStates>({
    action1,
    action2,
    action3,
    action4,
  });

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          {successProtocol ? (
            <SuccessProtocol
              actionStates={actionStates}
              successProtocol={successProtocol}
              setSuccessProtocol={setSuccessProtocol}
            />
          ) : null}
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
            checkboxStateAdmin={checkboxStateAdmin}
            setSubmitted={setSubmitted}
            setSuccessProtocol={setSuccessProtocol}
            setActionStates={setActionStates}
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
          <Button title="Registrera" onPress={() => setModalVisible(true)} />
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    width: '100%',
    flexGrow: 1,
    paddingBottom: 15,
    borderRadius: 20,
  },
});

export default AddUserScreen;
