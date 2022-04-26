import React from 'react';
import { Text, View } from 'react-native';

const BubblaRecieve = () => {
const { viewStyle, textStyle, } = styles;


    return (
        <View style={viewStyle}>
            <Text multiline={true} style={textStyle}>
                alwdkadhawhdawhdah a
                jhgwdajhdba jhajwdh ajd adv hagvdh agsvdh agvdhagv 
            </Text>
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        padding: 9,
        minWidth: 0,
        maxWidth: '70%',
        backgroundColor: '#FCF789',
        borderRadius: 12,
    },
    
    textStyle: {
        fontFamily: 'Nunito-sans',
        fontSize: 16,
        color: 'black',
        

    }
}

export default BubblaRecieve;