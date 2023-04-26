import React from 'react';
import {TextInput, View} from 'react-native';

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
    const {viewStyle, barStyle, redBarStyle} = styles;
    var empty = false;
    !value && submitted ? empty = true : false;
    
    return (
      <View style={viewStyle}>
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
          placeholder={title}
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
  },
  barStyle: {
    paddingLeft: 10,
    height: 52,
    width: '100%',
    color: 'black',
    // backgroundColor: '#EEEEEE',
    backgroundColor: '#C3C3C3',
    // borderColor: 'gray',
    // borderWidth: 2,
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    paddingLeft: 10,
    height: 52,
    width: '100%',
    // backgroundColor: '#EEEEEE',
    backgroundColor: '#C3C3C3',
    borderColor: '#D9534F',
    borderWidth: 3,
    borderRadius: 12,
  }
};

export default InputBarLogIn;
