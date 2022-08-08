import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native';

const ButtonSend = ({title, onPress}) => {
    const { btnContainerStyle, btnTextStyle, } = styles;
    return (
        <Pressable onPress={onPress}>
            <View style={btnContainerStyle}>
                <Text style={btnTextStyle}>{title}</Text>
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
       fontSize: 18,
       textAlign: 'center',
       textTransform: 'uppercase',
       fontFamily: 'NunitoSans-Regular'
    }
})

export default ButtonSend;