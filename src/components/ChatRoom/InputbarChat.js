import React from 'react';
import {TextInput, View} from 'react-native';

const InputBarChatt = ({msgToSend, setMsgToSend}) => {
  const {viewStyle, barStyle} = styles;

  return (
    <View style={viewStyle}>
      <TextInput
        style={barStyle}
        onChangeText={msgToSend => setMsgToSend(msgToSend)}
        value={msgToSend}
        autoFocus={true}
        multiline
        placeholder="Skriv något..."
        placeholderTextColor="grey"
        textBreakStrategy="simple"
        underlineColorAndroid="transparent"></TextInput>
    </View>
  );
};
const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '69%',
    paddingRight: 10,
  },
  barStyle: {
    // minHeight: 52,
    minHeight: '5%',
    maxHeight: 250,
    width: '100%',
    color: 'black',
    backgroundColor: '#EEEEEE',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    fontFamily: 'NunitoSans-Regular',
  },
};

export default InputBarChatt;
