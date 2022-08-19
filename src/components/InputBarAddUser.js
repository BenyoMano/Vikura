import React from 'react';
import { Text, TextInput, View } from 'react-native';

const InputBarAddUser = ({title, keys, value, userPropToAdd, setUserPropToAdd, capitalize, keyType }) => {
const { viewStyle, textStyle, barStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{title}</Text>
            <TextInput style={barStyle} 
                autoCapitalize={capitalize}
                keyboardType={keyType}
                onChangeText={v => setUserPropToAdd({...userPropToAdd, [keys]: v})}
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

export default InputBarAddUser;