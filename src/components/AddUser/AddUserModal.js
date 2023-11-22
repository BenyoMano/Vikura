import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import addUser from './addUser';
import SmallButton from '../../atoms/SmallButton';
import {Label} from './Label';
import {UserPropInfo} from './UserPropInfo';

export const AddUserModal = ({
  modalVisible,
  setModalVisible,
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  checkboxStateAdmin,
  setSubmitted,
  setActionStates,
  setSuccessProtocol,
}) => {
  const showIfKurator = checkboxStateKurator ? 'JA' : 'NEJ';
  const showIfAdmin = checkboxStateAdmin ? 'JA' : 'NEJ';

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <Label labelTitle={'Namn:'} />
        <UserPropInfo
          userProp={userPropToAdd.firstName + ' ' + userPropToAdd.secondName}
        />
        <Label labelTitle={'Mejl:'} />
        <UserPropInfo userProp={userPropToAdd.mejl} />
        <Label labelTitle={'Lösenord:'} />
        <UserPropInfo userProp={userPropToAdd.password} />
        <Label labelTitle={'Personnummer:'} />
        <UserPropInfo userProp={userPropToAdd.personnummer} />
        <Label labelTitle={'Utökad behörighet:'} />
        <UserPropInfo userProp={showIfKurator} />
        <Label labelTitle={'Admin:'} />
        <UserPropInfo userProp={showIfAdmin} />
        <View style={styles.buttonContainer}>
          <SmallButton
            title="Tillbaka"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <SmallButton
            title="Bekräfta"
            onPress={() => {
              setSubmitted(true);
              addUser({
                userPropToAdd,
                setUserPropToAdd,
                checkboxStateKurator,
                checkboxStateAdmin,
                setSubmitted,
                setSuccessProtocol,
                setActionStates,
              });
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '80%',
    minWidth: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: '20%',
    paddingHorizontal: 25,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 30,
    elevation: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
