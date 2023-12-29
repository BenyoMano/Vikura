import React, {ForwardedRef} from 'react';
import {TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import {LoginDetailsProps} from './HomeScreen';

interface InputBarLogInProps extends TextInputProps {
  title: string;
  keys: 'mejl' | 'password';
  loginDetails: LoginDetailsProps;
  setLoginDetails: React.Dispatch<React.SetStateAction<LoginDetailsProps>>;
  submitted: boolean;
  ref?: ForwardedRef<TextInput>;
}

const InputBarLogIn: React.FC<InputBarLogInProps> = React.forwardRef(
  (
    {
      title,
      autoFocus,
      blurOnSubmit,
      keys,
      value,
      loginDetails,
      setLoginDetails,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      submitted,
    },
    ref,
  ) => {
    const {viewStyle, barStyle, redBarStyle} = styles;
    const empty = !value && submitted;

    return (
      <View style={viewStyle}>
        <TextInput
          style={empty ? redBarStyle : barStyle}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onChangeText={v => setLoginDetails({...loginDetails, [keys]: v})}
          value={value}
          placeholder={title}
          placeholderTextColor={'#4F4F4F'}
        />
      </View>
    );
  },
);

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  } as ViewStyle,
  barStyle: {
    paddingLeft: 10,
    height: 52,
    width: '100%',
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    paddingLeft: 10,
    height: 52,
    width: '100%',
    backgroundColor: '#C3C3C3',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
  },
};

export default InputBarLogIn;
