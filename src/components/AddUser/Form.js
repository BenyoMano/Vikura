import React, {useState} from 'react';
import {View} from 'react-native';
import InputbarAddUser from './InputbarAddUser';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Form = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxState,
  setCheckboxState,
}) => {
  /* const [checkboxState, setCheckboxState] = React.useState(false); */
  const {viewStyle} = styles;
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

  function kuratorCheck() {
    console.log('firstname', firstName);
    if (!checkboxState) {
      userPropToAdd.kurator = true;
    } else {
      userPropToAdd.kurator = false;
    }
    setUserPropToAdd({...userPropToAdd, kurator});
    // setUserPropToAdd(userPropToAdd.kurator)
    console.log('Kurator:', userPropToAdd.kurator);
  }

  return (
    <View style={viewStyle.container}>
      <View>
        <InputbarAddUser
          title="Förnamn:"
          capitalize="words"
          keys={'firstName'}
          value={firstName}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
      <View>
        <InputbarAddUser
          title="Efternamn:"
          capitalize="words"
          keys={'secondName'}
          value={secondName}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
      <View>
        <InputbarAddUser
          title="Mejl:"
          keyType="email-address"
          capitalize={capitalize}
          keys={'mejl'}
          value={mejl}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
      <View>
        <InputbarAddUser
          title="Lösenord:"
          capitalize={capitalize}
          keys={'password'}
          value={password}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
        />
      </View>
      <View>
        <InputbarAddUser
          title="Personnummer:"
          keyType="numeric"
          keys={'personnummer'}
          value={personnummer}
          userPropToAdd={userPropToAdd}
          setUserPropToAdd={setUserPropToAdd}
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
          /* value={kurator} */
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
