import React, {  } from "react";
import { View } from 'react-native';
import InputBarAddUser from "./InputBarAddUser";

const Form = ({ userPropToAdd, setUserPropToAdd }) => {
    const { viewStyle } = styles;
    const {
        firstName,
        secondName,
        mejl,
        password,
        personnummer
    } = userPropToAdd

    return (
        <View style={viewStyle.container}>
            <View>
                <InputBarAddUser title='Förnamn:' keys={"firstName"} value={firstName} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Efternamn:' keys={"secondName"} value={secondName} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Mejl:' keys={"mejl"} value={mejl} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Lösenord:' keys={"password"} value={password} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} /> 
            </View>
            <View>
                <InputBarAddUser title='Personnummer:' keys={"personnummer"} value={personnummer} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
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
            overflow: 'hidden',
        },
    }
};

export default Form;