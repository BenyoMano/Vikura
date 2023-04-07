/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import InputbarAddUser from './InputbarAddUser';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Form = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxState,
  setCheckboxState,
  submitted,
}) => {
  const {color, greyScale, viewStyle} = styles;
  const capitalize = 'none';
  const {
    firstName,
    secondName,
    mejl,
    password,
    personnummer,
    firstLogin,
    kurator,
  } = userPropToAdd;
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();


  function kuratorCheck() {
    if (!checkboxState) {
      userPropToAdd.kurator = true;
    } else {
      userPropToAdd.kurator = false;
    }
    setUserPropToAdd({...userPropToAdd, kurator});
  }

  return (
    <View style={viewStyle.container}>
      <View>
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
      </View>
      <View>
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
      </View>
      <View>
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
      </View>
      <View>
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
      </View>
      <View>
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
      </View>
      <View style={{paddingTop: 15, alignSelf: 'flex-start'}}>
        <BouncyCheckbox
          size={36}
          fillColor="#569253"
          unfillColor="#FFFFFF"
          isChecked={checkboxState}
          text="KURATOR"
          iconStyle={{borderRadius: 10}}
          innerIconStyle={{borderRadius: 10, borderWidth: 2}}
          textStyle={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 24,
            textDecorationLine: 'none',
          }}
          //disableBuiltInState
          onPress={() => {
            setCheckboxState(!checkboxState);
            kuratorCheck();
          }}
          keys={'kurator'}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

export default Form;
