import React, {  } from "react";
import { View } from 'react-native';
import InputBar from "./InputBar";
import InputBarAddUser from "./InputBarAddUser";

const Form = ({ userPropToAdd, setUserPropToAdd }) => {
    const {
        fornamn,
        efternamn,
        mejl,
        password,
        personnummer
    } = userPropToAdd
    
    const { viewStyle } = styles;

    return (
        <View style={viewStyle.container}>
            <View>
                <InputBarAddUser title='Förnamn:' keys={"fornamn"} value={fornamn} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Efternamn:' keys={"efternamn"} value={efternamn} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
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
            //overflow: 'hidden',
        },
    }
};

export default Form;