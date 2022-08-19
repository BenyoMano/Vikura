import React, {  } from "react";
import { View } from 'react-native';
import InputBarAddUser from "./InputBarAddUser";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Form = ({ userPropToAdd, setUserPropToAdd }) => {
    const { viewStyle } = styles;
    const capitalize = 'none'
    const {
        firstName,
        secondName,
        mejl,
        password,
        personnummer,
        firstLogin,
        kurator = false,
    } = userPropToAdd
    
    function kuratorCheck() {
        console.log('firstname', firstName)
        if (userPropToAdd.kurator === false && !true) {userPropToAdd.kurator = true}
        else {userPropToAdd.kurator = false}
        setUserPropToAdd({...userPropToAdd, kurator})
        // setUserPropToAdd(userPropToAdd.kurator)
        console.log('Kurator:', userPropToAdd.kurator);
    }

    return (
        <View style={viewStyle.container}>
            <View>
                <InputBarAddUser title='Förnamn:' capitalize='words' keys={"firstName"} value={firstName} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Efternamn:' capitalize='words' keys={"secondName"} value={secondName} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Mejl:' keyType='email-address' capitalize={capitalize} keys={"mejl"} value={mejl} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View>
                <InputBarAddUser title='Lösenord:' capitalize={capitalize} keys={"password"} value={password} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} /> 
            </View>
            <View>
                <InputBarAddUser title='Personnummer:' keyType='numeric' keys={"personnummer"} value={personnummer} userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} />
            </View>
            <View style={{ paddingTop: 15, alignSelf: "flex-start" }}>
            <BouncyCheckbox
                size={36}
                fillColor="#569253"
                unfillColor="#FFFFFF"
                text="KURATOR"
                iconStyle={{ borderRadius: 10 }}
                innerIconStyle={{ borderRadius: 10, borderWidth: 2}}
                textStyle={{ fontFamily: "NunitoSans-SemiBold", fontSize: 24, textDecorationLine: "none" }}
                onPress={() => {
                    kuratorCheck();
                }}
                keys={"kurator"}
                /* value={kurator} */
                userPropToAdd={userPropToAdd}
                setUserPropToAdd={setUserPropToAdd}
                />
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