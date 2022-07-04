import React from 'react';
import { Text, TextInput, View } from 'react-native';

const InputBar = (props) => {
const { viewStyle, textStyle, barStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.title}</Text>
            <TextInput style={barStyle} />
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 60,
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

export default InputBar;