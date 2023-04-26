import React from 'react';
import {TextInput, View} from 'react-native';

const InputBarNewDetails = React.forwardRef(
  (
    {
      autoFocus,
      blurOnSubmit,
      title,
      keys,
      value,
      newDetails,
      setNewDetails,
      security,
      capitalize,
      returnKeyType,
      onSubmitEditing,
      submitted
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
          autoCapitalize={capitalize}
          returnKeyType={returnKeyType}
          secureTextEntry={security}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onChangeText={v => setNewDetails({...newDetails, [keys]: v})}
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
  }
};

export default InputBarNewDetails;
