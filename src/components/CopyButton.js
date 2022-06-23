import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Button = (props) => {
    const { btnContainerStyle } = styles;
    return (
        <Pressable onPress={props.onPress}>
            <View style={btnContainerStyle}>
                <Icon name='copy' type='font-awesome' color='black' size={28} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create ({

    btnContainerStyle: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 0,
        borderColor: 'lightblue',
        justifyContent: 'center',
    },
})

export default Button;