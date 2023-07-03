import React from 'react';
import {TextInput, View} from 'react-native';

const InputBarChatt = ({messageToSend, setMessageToSend}) => {
  const {viewStyle, barStyle} = styles;

  return (
    <View style={viewStyle}>
      <TextInput
      testID='inputbarChat'
        style={barStyle}
        onChangeText={messageToSend => setMessageToSend(messageToSend)}
        value={messageToSend}
        autoFocus={true}
        multiline
        placeholder="Skriv något..."
        placeholderTextColor="grey"
        textBreakStrategy="simple"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};
export const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '69%',
    paddingRight: 10,
  },
  barStyle: {
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
