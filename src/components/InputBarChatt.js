import React from 'react';
import { TextInput, View } from 'react-native';

const InputBarChatt = (props) => {
const { viewStyle, barStyle } = styles;

    return (
        <View style={viewStyle}>
            <TextInput style={barStyle} />
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
        height: 52,
        width: 244,
        color: 'black',
        backgroundColor: '#EEEEEE',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
        fontFamily: 'NunitoSans-Regular'
    }
}

export default InputBarChatt;