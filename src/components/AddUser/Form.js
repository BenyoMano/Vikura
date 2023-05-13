/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View} from 'react-native';
import InputbarAddUser from './InputbarAddUser';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Form = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  setCheckboxStateKurator,
  checkboxStateAdmin,
  setCheckboxStateAdmin,
  submitted,
}) => {
  const {container} = styles;
  const capitalize = 'none';
  const {firstName, secondName, mejl, password, personnummer, kurator, admin} =
    userPropToAdd;
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

  function kuratorCheck() {
    if (!checkboxStateKurator) {
      userPropToAdd.kurator = true;
    } else {
      userPropToAdd.kurator = false;
    }
    setUserPropToAdd({...userPropToAdd, kurator});
  }

  function adminCheck() {
    !checkboxStateAdmin ? userPropToAdd.admin = true : false;
    setUserPropToAdd({...userPropToAdd, admin});
  }

  return (
    <View style={container}>
        <InputbarAddUser
          autoFocus={false}
          blurOnSubmit={false}
          title="Förnamn:"
          returnKeyType="next"
          capitalize="words"
          keys={'firstName'}
          value={firstName}
          onSubmitEditing={() => ref_input2.current.focus()}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
          submitted={submitted}
        />
        <InputbarAddUser
          autoFocus={false}
          blurOnSubmit={false}
          title="Efternamn:"
          returnKeyType="next"
          capitalize="words"
          keys={'secondName'}
          value={secondName}
          ref={ref_input2}
          onSubmitEditing={() => ref_input3.current.focus()}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
          submitted={submitted}
        />
        <InputbarAddUser
          autoFocus={false}
          blurOnSubmit={false}
          title="Mejl:"
          returnKeyType="next"
          keyType="email-address"
          capitalize={capitalize}
          keys={'mejl'}
          value={mejl}
          ref={ref_input3}
          onSubmitEditing={() => ref_input4.current.focus()}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
          submitted={submitted}
        />
        <InputbarAddUser
          autoFocus={false}
          blurOnSubmit={false}
          title="Lösenord:"
          returnKeyType="next"
          capitalize={capitalize}
          keys={'password'}
          value={password}
          ref={ref_input4}
          onSubmitEditing={() => ref_input5.current.focus()}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
          submitted={submitted}
        />
        <InputbarAddUser
          autoFocus={false}
          blurOnSubmit={true}
          title="Personnummer:"
          keyType="numeric"
          keys={'personnummer'}
          value={personnummer}
          ref={ref_input5}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
          submitted={submitted}
        />
      <View style={{paddingTop: 25, alignSelf: 'flex-start'}}>
        <BouncyCheckbox
          size={36}
          fillColor="#569253"
          unfillColor="#FFFFFF"
          isChecked={checkboxStateKurator}
          text="Utökad behörighet"
          iconStyle={{borderRadius: 10}}
          innerIconStyle={{borderRadius: 10, borderWidth: 2}}
          textStyle={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 22,
            textDecorationLine: 'none',
          }}
          //disableBuiltInState
          onPress={() => {
            setCheckboxStateKurator(!checkboxStateKurator);
            kuratorCheck();
          }}
          keys={'kurator'}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
      <View style={{paddingTop: 25, alignSelf: 'flex-start'}}>
        <BouncyCheckbox
          size={36}
          fillColor="#569253"
          unfillColor="#FFFFFF"
          isChecked={checkboxStateAdmin}
          text="Admin"
          iconStyle={{borderRadius: 10}}
          innerIconStyle={{borderRadius: 10, borderWidth: 2}}
          textStyle={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 22,
            textDecorationLine: 'none',
          }}
          //disableBuiltInState
          onPress={() => {
            setCheckboxStateAdmin(!checkboxStateAdmin);
            kuratorCheck();
          }}
          keys={'admin'}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
  },
};

export default Form;
