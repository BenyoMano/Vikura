import React, {ForwardedRef, RefObject} from 'react';
import {TextInput, View, ViewStyle, TextInputProps} from 'react-native';
import {NewDetailsProps} from './NewClientScreen';

interface InputBarNewDetailsProps extends TextInputProps {
  keys: 'alias' | 'password' | 'rePassword';
  newDetails: NewDetailsProps;
  setNewDetails: React.Dispatch<React.SetStateAction<NewDetailsProps>>;
  submitted: boolean;
}

const InputBarNewDetails: React.FC<InputBarNewDetailsProps> = React.forwardRef(
  (
    {
      autoFocus,
      blurOnSubmit,
      placeholder,
      keys,
      value,
      newDetails,
      setNewDetails,
      secureTextEntry,
      autoCapitalize,
      returnKeyType,
      onSubmitEditing,
      submitted,
    },
    ref: ForwardedRef<TextInput>,
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
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onChangeText={v => setNewDetails({...newDetails, [keys]: v})}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#575757'}
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
  } as ViewStyle,
  redBarStyle: {
    paddingLeft: 10,
    height: 52,
    width: '100%',
    backgroundColor: '#C3C3C3',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
  } as ViewStyle,
};

export default InputBarNewDetails;
