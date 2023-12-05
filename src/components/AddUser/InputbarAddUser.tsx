import React, {ForwardedRef} from 'react';
import {
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {UserPropToAdd} from './AddUserScreen';

type InputBarAddUserProps = {
  title: string;
  blurOnSubmit: boolean;
  keyType?: React.ComponentProps<typeof TextInput>['keyboardType'];
  returnKeyType: React.ComponentProps<typeof TextInput>['returnKeyType'];
  capitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
  value: string;
  keys: string;
  userPropToAdd: UserPropToAdd;
  setUserPropToAdd: React.Dispatch<React.SetStateAction<UserPropToAdd>>;
  onSubmitEditing?: (e: TextInputSubmitEditingEventData) => void;
  submitted: boolean;
  ref?: ForwardedRef<TextInput>;
};

const InputBarAddUser: React.FC<InputBarAddUserProps> = React.forwardRef(
  (
    {
      title,
      blurOnSubmit,
      keyType,
      returnKeyType,
      capitalize,
      value,
      keys,
      userPropToAdd,
      setUserPropToAdd,
      onSubmitEditing,
      submitted,
    }: InputBarAddUserProps,
    ref,
  ) => {
    const {viewStyle, textStyle, barStyle, redBarStyle} = styles;
    const empty = !value && submitted;

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{title}</Text>
        <TextInput
          style={empty ? redBarStyle : barStyle}
          blurOnSubmit={blurOnSubmit}
          keyboardType={keyType}
          returnKeyType={returnKeyType}
          autoCapitalize={capitalize}
          value={value}
          ref={ref}
          onSubmitEditing={onSubmitEditing as any}
          onChangeText={v => setUserPropToAdd({...userPropToAdd, [keys]: v})}
        />
      </View>
    );
  },
);

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: '12%',
  } as ViewStyle,
  textStyle: {
    fontSize: 12,
    color: 'black',
    paddingBottom: 2,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
  barStyle: {
    height: '70%',
    width: 320,
    minWidth: '70%',
    paddingLeft: 5,
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  } as ViewStyle,
  redBarStyle: {
    height: '70%',
    width: 320,
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  } as ViewStyle,
};

export default InputBarAddUser;
