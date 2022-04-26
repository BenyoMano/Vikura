import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native';

const ButtonSend = (props) => {
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
        width: 100,
        height: 52,
        backgroundColor: '#C4C4C4',
        borderRadius: 12,
        justifyContent: 'center',
    },

    btnTextStyle: {
       color: 'black',
       fontSize: 22,
       textAlign: 'center',
       textTransform: 'uppercase',
       fontFamily: 'NunitoSans-Regular'
    }
})

export default ButtonSend;