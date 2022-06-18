import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native';

const Button = (props) => {
    const { btnContainerStyle, btnTextStyle, } = styles;
    return (
        <Pressable onPress={props.onPress}>
            <View style={btnContainerStyle}>
                <Text style={btnTextStyle}>{props.title}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create ({
    btnContainerStyle: {
        backgroundColor: '#C4C4C4',
        paddingVertical: 18,
        width: 230,
        borderRadius: 12,
        marginTop: 80,
    },
    btnTextStyle: {
       color: 'black',
       fontSize: 18,
       textAlign: 'center',
       textTransform: 'uppercase',
       fontFamily: 'NunitoSans-Regular'
    }
})

export default Button;