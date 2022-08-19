import React from 'react';
import { Text, TextInput, View } from 'react-native';

const InputBarNewDetails = ({title, keys, value, newDetails, setNewDetails, security, capitalize }) => {
const { viewStyle, textStyle, barStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{title}</Text>
            <TextInput style={barStyle} 
                autoCorrect={false}
                autoCapitalize={capitalize}
                secureTextEntry={security}
                onChangeText={v => setNewDetails({...newDetails, [keys]: v})}
                value={value}
                >
            </TextInput>
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        //alignItems: 'center',
        width: '80%',
        marginTop: 20,
       // backgroundColor: 'lightblue',
    },
    textStyle: {
        fontSize: 12,
        color: 'black',
        paddingBottom: 2,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontFamily: 'NunitoSans-Regular'
    },
    barStyle: {
        height: 52,
        width: 320,
        color: 'black',
        backgroundColor: '#FFFFFF',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: 'NunitoSans-Regular'
    }
}

export default InputBarNewDetails;