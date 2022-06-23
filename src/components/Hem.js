import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import InputBar from "./InputBar";
import Logo from "./Logo";
import Welcome from './Welcome';
import auth from '@react-native-firebase/auth';

function Initiate() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    console.log('Initiate');

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        //console.log(user.phoneNumber);
        //console.log('User id: ' + auth().currentUser.uid);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; //unsubscribe on unmount
    }, []);
    
    if (initializing) return null;

    if(!user) {
        return (
            <View>
                <Text>Login</Text>
            </View>
        );
    }
    return (
        <View>
            <Text>Welcome {user.phoneNumber}</Text>
        </View>
    );
}

function PhoneSignIn(user) {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('789454');
    console.log('PhoneSignIn');
    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        console.log('await auth.signInWPN(pn)')
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }
    async function confirmCode() {
        try {
            console.log('await confirm.confirm(code)');
            await confirm.confirm(code);
            console.log('Code: ' + (code));
            console.log('UID: ',(auth().currentUser.uid));
            console.log('ID Token', (auth().currentUser.getIdToken));
        } 
        catch (error) {
            console.log('Invalid code.');
        }
    }
    async function signOut() {
        try {
            console.log('Await sign out');
            await auth().signOut();
            //console.log('User id: ' + auth().currentUser.uid);
        }
        catch (error) {
            console.log('Error signing out');
        }
    }
    if (!confirm) {
        return (
            <Button 
                title='Phone Number Sign In'
                onPress={() => signInWithPhoneNumber('+46725180309')}
                />
        );
    }
    return (
        <View style={{flex:1}}>
            <TextInput style={{backgroundColor: 'green'}} value={code} onChangeText={text => setCode(text)} />
            <Button title='Confirm Code' onPress={() => confirmCode()} />
            <Button title='Sign Out' onPress={() => signOut()} />
        </View>
    );
}

const Hem = ({ navigation }) => {

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
                   {/*  <View style={{flex: 1}}>
                        <Welcome title='Välkommen!' style={{ fontSize: 42, marginTop:-10 }} />
                    </View> */}
                    <View style={{flex: 0}}>
                        <Initiate />
                    </View>
                    <View style={{flex:1}}>
                        <PhoneSignIn />
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