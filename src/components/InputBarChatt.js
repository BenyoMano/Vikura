import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const InputBarChatt = (props) => {
const { viewStyle, barStyle } = styles;
const [text, onChangeText] = useState();

    return (
        <View style={viewStyle}>
            <TextInput style={barStyle} 
            onChangeText={onChangeText} 
            value={text} 
            multiline
            placeholder="Skriv något..." 
            placeholderTextColor="grey" 
            textBreakStrategy='simple'
            underlineColorAndroid='transparent'
            >
            </TextInput>
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    barStyle: {
        minHeight: 52,
        maxHeight: 250,
        width: 244,
        color: 'black',
        backgroundColor: '#EEEEEE',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
        padding: 10,
        fontFamily: 'NunitoSans-Regular',
    }
}

export default InputBarChatt;