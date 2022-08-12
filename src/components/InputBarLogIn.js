import React from 'react';
import { Text, TextInput, View } from 'react-native';

const InputBarLogIn = ({title, keys, value, loginDetails, setLoginDetails, security }) => {
const { viewStyle, textStyle, barStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{title}</Text>
            <TextInput style={barStyle} 
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={security}
                onChangeText={v => setLoginDetails({...loginDetails, [keys]: v})}
                value={value}
                >
            </TextInput>
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
       // backgroundColor: 'lightblue',
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        paddingBottom: 5,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontFamily: 'NunitoSans-Regular'
    },
    barStyle: {
        height: 52,
        width: 320,
        color: 'black',
        backgroundColor: '#EEEEEE',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: 'NunitoSans-Regular'
    }
}

export default InputBarLogIn;