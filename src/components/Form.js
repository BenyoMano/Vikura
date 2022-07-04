import React, { } from "react";
import { View } from 'react-native';
import InputBar from "./InputBar";

const Form = () => {
    
    const { viewStyle } = styles;

    return (
        <View style={viewStyle.container}>
            <View>
                <InputBar title='Förnamn:' />
            </View>
            <View>
                <InputBar title='Efternamn:' />
            </View>
            <View>
                <InputBar title='Mejl:' />
            </View>
            <View>
                <InputBar title='Personnummer:' />
            </View>
        </View>
    );
}

const styles = {

    viewStyle: {
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            //overflow: 'hidden',
        },
    }
};

export default Form;