import React from 'react';
import {Text, TextInput, View} from 'react-native';

const InputBarAddUser = React.forwardRef(
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
    },
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
          onSubmitEditing={onSubmitEditing}
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
    height: '70%',
    width: 320,
    minWidth: '70%',
    paddingLeft: 5,
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    height: '70%',
    width: 320,
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
};

export default InputBarAddUser;
