import React from 'react';
import {Text, TextInput, View} from 'react-native';

const InputBarLogIn = React.forwardRef(
  (
    {
      autoFocus,
      blurOnSubmit,
      title,
      keys,
      value,
      loginDetails,
      setLoginDetails,
      security,
      keyType,
      returnKeyType,
      onSubmitEditing,
      submitted,
    },
    ref,
  ) => {
    const {viewStyle, textStyle, barStyle, redBarStyle} = styles;
    var empty = false;
    !value && submitted ? empty = true : false;
    
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{title}</Text>
        <TextInput
          style={empty ? redBarStyle : barStyle}
          autoFocus={autoFocus}
          blurOnSubmit={blurOnSubmit}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType={keyType}
          returnKeyType={returnKeyType}
          secureTextEntry={security}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onChangeText={v => setLoginDetails({...loginDetails, [keys]: v})}
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
    width: '100%',
    marginTop: 15,
  },
  textStyle: {
    fontSize: 14,
    color: 'black',
    paddingBottom: 5,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
  },
  barStyle: {
    height: 52,
    width: '100%',
    color: 'black',
    backgroundColor: '#EEEEEE',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    height: 52,
    width: '100%',
    backgroundColor: '#EEEEEE',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
  }
};

export default InputBarLogIn;
