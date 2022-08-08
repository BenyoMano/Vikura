import React, {  } from "react";
import { View } from 'react-native';
import InputBar from "./InputBar";
import InputBarAddUser from "./InputBarAddUser";

const Form = ({ userPropToAdd, setUserPropToAdd }) => {
    
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
                <InputBarAddUser title='Mejl:' userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBar title='Lösenord:' /> 
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