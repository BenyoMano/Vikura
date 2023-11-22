/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View} from 'react-native';
import InputbarAddUser from './InputbarAddUser';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useState} from 'react';

const Form = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  setCheckboxStateKurator,
  checkboxStateAdmin,
  setCheckboxStateAdmin,
  submitted,
}) => {
  const [calculatedHeight, setCalculatedHeight] = useState(null);
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
    !checkboxStateAdmin
      ? (userPropToAdd.admin = true)
      : (userPropToAdd.admin = false);
    setUserPropToAdd({...userPropToAdd, admin});
  }

  const onLayout = event => {
    setCalculatedHeight(event.nativeEvent.layout.height);
  };

  const containerStyle = {
    height: calculatedHeight,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
  };

  return (
    <View style={containerStyle} onLayout={onLayout}>
      <InputbarAddUser
        title="Förnamn:"
        blurOnSubmit={false}
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
        title="Efternamn:"
        blurOnSubmit={false}
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
        title="Mejl:"
        blurOnSubmit={false}
        keyType="email-address"
        returnKeyType="next"
        capitalize="none"
        keys={'mejl'}
        value={mejl}
        ref={ref_input3}
        onSubmitEditing={() => ref_input4.current.focus()}
        userPropToAdd={userPropToAdd}
        setUserPropToAdd={setUserPropToAdd}
        submitted={submitted}
      />
      <InputbarAddUser
        title="Lösenord:"
        blurOnSubmit={false}
        returnKeyType="next"
        capitalize="none"
        keys={'password'}
        value={password}
        ref={ref_input4}
        onSubmitEditing={() => ref_input5.current.focus()}
        userPropToAdd={userPropToAdd}
        setUserPropToAdd={setUserPropToAdd}
        submitted={submitted}
      />
      <InputbarAddUser
        title="Personnummer:"
        blurOnSubmit={true}
        keyType="numeric"
        returnKeyType="done"
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
          onPress={() => {
            setCheckboxStateAdmin(!checkboxStateAdmin);
            adminCheck();
          }}
          keys={'admin'}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
    </View>
  );
};

export default Form;
