import React from 'react';
import {TextInput, View, ViewStyle} from 'react-native';

type InputBarChattProps = {
  messageToSend: string;
  setMessageToSend: React.Dispatch<React.SetStateAction<string>>;
};

const InputBarChatt: React.FC<InputBarChattProps> = ({
  messageToSend,
  setMessageToSend,
}) => {
  const {viewStyle, barStyle} = styles;

  return (
    <View style={viewStyle}>
      <TextInput
        style={barStyle}
        onChangeText={messageToSend => setMessageToSend(messageToSend)}
        value={messageToSend}
        autoFocus={true}
        multiline
        placeholder="Skriv något..."
        placeholderTextColor="#4F4F4F"
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
  } as ViewStyle,
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
  } as ViewStyle,
};

export default InputBarChatt;
