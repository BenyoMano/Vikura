import React from 'react';
import {Dimensions, Text, TextInput, View} from 'react-native';

const InputBarAddUser = React.forwardRef(
  (
    {
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
    const empty = !value && submitted;

    const windowHeight = Dimensions.get('window').height;
    // console.log('Window', windowHeight);
    const onLayout = event => {
      console.log('Comp Height', event.nativeEvent.layout.height);
    };

    return (
      <View style={viewStyle} onLayout={onLayout}>
        <Text style={textStyle}>{title}</Text>
        <TextInput
          style={empty ? redBarStyle : barStyle}
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
    height: 52,
    // height: '75%',
    width: 320,
    paddingLeft: 5,
    color: 'black',
    backgroundColor: '#C3C3C3',
    borderRadius: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  redBarStyle: {
    // height: '75%',
    height: 52,
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
