import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import Logo from "./Logo";
import Welcome from './Welcome';
import auth from '@react-native-firebase/auth';
import InputBarLogIn from "./InputBarLogIn";

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

const Hem = ({ navigation }) => {

    const [loginDetails, setLoginDetails] = useState({});
    const {
        mejl,
        password
    } = loginDetails

    async function signIn() {
        await auth().signInWithEmailAndPassword(loginDetails.mejl, loginDetails.password).then(() => {
            console.log('User signed in!');
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email adress is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email adress is invalid!');
            }
            console.error(error);
        });
        const user = auth().currentUser;

        //Clear TextInput fields
        setLoginDetails({           
            mejl: "",
            password: "",
        })
    }

    function signOut() {
        auth().signOut().then(() => console.log('User signed out!'))
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
                        <InputBarLogIn title='Mejl:' keys={"mejl"} value={mejl} loginDetails={loginDetails} setLoginDetails={setLoginDetails} />
                        <InputBarLogIn title='Kod:' keys={"password"} value={password} loginDetails={loginDetails} setLoginDetails={setLoginDetails} />
                    </View>
                    <View style={{flex: 1}}>
                        <Button title='Logga in' onPress={() => signIn()} />
                        <Button title='Logga ut' onPress={() => signOut()} />
                        <Button title='Nästa' onPress={() => navigation.navigate('Elev')} />
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