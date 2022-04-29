import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import InputBar from "./InputBar";
import Logo from "./Logo";
import Welcome from './Welcome';
//import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


/* //const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;
const auth = getAuth();
//auth.languageCode = 'it';
firebase.auth().useDeviceLanguage();

window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
        // reCATPCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    }
}, auth);

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
    }).catch((error) => {
        //Error, sms not sent
        //...
    }); */


const Hem = ({ navigation }) => {

    const onPress = () => {
    alert('Pressed')
}
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, {
                    flexDirection: 'column'
                }]}>
                    <View>
                        <Logo style={{ width: 160, height: 62, marginTop: 90 }}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Welcome title='Välkommen!' style={{ fontSize: 42, marginTop:-10 }} />
                    </View>
                    <View style={{flex: 1}}>
                        <InputBar title='Kod:' />
                    </View>
                    <View style={{flex: 1}}>
                        <Button title='Logga in' onPress={() => 
                        navigation.navigate('Elev')} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
});

export default Hem;