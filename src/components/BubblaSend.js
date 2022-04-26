import React from 'react';
import { Text, View } from 'react-native';

const BubblaSend = () => {
const { viewStyle, textStyle, } = styles;


    return (
        <View style={viewStyle}>
            <Text multiline={true} style={textStyle}>
                alwdkadhawhdawhdah ajhgwdajhdba jhajwdh ajd adv hagvdh agsvdh agvdhagv 
            </Text>
        </View>
    );
}

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        padding: 9,
        minWidth: 0,
        maxWidth: '70%',
        backgroundColor: '#C7D4F6',
        borderRadius: 12,
    },
    
    textStyle: {
        fontFamily: 'Nunito-sans',
        fontSize: 16,
        color: 'black',
        

    }
}

export default BubblaSend;