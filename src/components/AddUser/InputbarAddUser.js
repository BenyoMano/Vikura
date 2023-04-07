import React from 'react';
import {Text, TextInput, View} from 'react-native';

const InputBarAddUser = React.forwardRef(
  (
    {
      autoFocus,
      blurOnSubmit,
      title,
      keys,
      value,
      userPropToAdd,
      setUserPropToAdd,
      capitalize,
      keyType,
      returnKeyType,
      onSubmitEditing,
      submitted,
    },
    ref,
  ) => {
    const {viewStyle, textStyle, barStyle, redBarStyle} = styles;
    var empty = false;
    !value && submitted ? (empty = true) : false;

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{title}</Text>
        <TextInput
          style={empty ? redBarStyle : barStyle}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={capitalize}
          returnKeyType={returnKeyType}
          keyboardType={keyType}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onChangeText={v => setUserPropToAdd({...userPropToAdd, [keys]: v})}
          value={value}
        />
      </View>
    );
  },
);

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '80%',
    marginTop: 20,
  },
  textStyle: {
    fontSize: 12,
    color: 'black',
    paddingBottom: 2,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
  },
  barStyle: {
    height: 52,
    width: 320,
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    height: 52,
    width: 320,
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
};

export default InputBarAddUser;
