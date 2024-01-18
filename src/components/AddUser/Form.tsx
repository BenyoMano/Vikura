import React, {useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import InputbarAddUser from './InputbarAddUser';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {UserPropToAdd} from './AddUserScreen';

type FormProps = {
  userPropToAdd: UserPropToAdd;
  setUserPropToAdd: React.Dispatch<React.SetStateAction<UserPropToAdd>>;
  checkboxStateKurator: boolean;
  setCheckboxStateKurator: React.Dispatch<React.SetStateAction<boolean>>;
  checkboxStateAdmin: boolean;
  setCheckboxStateAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  submitted: boolean;
};

const Form: React.FC<FormProps> = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  setCheckboxStateKurator,
  checkboxStateAdmin,
  setCheckboxStateAdmin,
  submitted,
}) => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const {firstName, secondName, mail, password, personnummer, kurator, admin} =
    userPropToAdd;
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);
  const ref_input4 = useRef<TextInput>(null);
  const ref_input5 = useRef<TextInput>(null);

  function kuratorCheck() {
    !checkboxStateKurator
      ? (userPropToAdd.kurator = true)
      : (userPropToAdd.kurator = false);
    setCheckboxStateKurator(!checkboxStateKurator);
    setUserPropToAdd({...userPropToAdd, kurator});
  }

  function adminCheck() {
    !checkboxStateAdmin
      ? (userPropToAdd.admin = true)
      : (userPropToAdd.admin = false);
    setCheckboxStateAdmin(!checkboxStateAdmin);
    setUserPropToAdd({...userPropToAdd, admin});
  }

  const onLayout = (event: LayoutChangeEvent) => {
    setCalculatedHeight(event.nativeEvent.layout.height);
  };

  const containerStyle: StyleProp<ViewStyle> = {
    height: calculatedHeight || undefined,
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
        onSubmitEditing={() => ref_input2.current?.focus()}
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
        onSubmitEditing={() => ref_input3.current?.focus()}
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
        keys={'mail'}
        value={mail}
        ref={ref_input3}
        onSubmitEditing={() => ref_input4.current?.focus()}
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
        onSubmitEditing={() => ref_input5.current?.focus()}
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
          text="Kurator"
          iconStyle={{borderRadius: 10}}
          innerIconStyle={{borderRadius: 10, borderWidth: 2}}
          textStyle={{
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: 22,
            textDecorationLine: 'none',
          }}
          onPress={() => {
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
