import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import Logo from "./Logo";
import Welcome from './Welcome';
import auth from '@react-native-firebase/auth';
import InputBarLogIn from "./InputBarLogIn";
import firestore from '@react-native-firebase/firestore';

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
    const security = false
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
        firestore().collection('Users').doc(user.uid).onSnapshot(querySnapshot => {
            const newUserStatus = querySnapshot.get('firstLogin')
            const kuratorStatus = querySnapshot.get('kurator')
            console.log('User status', newUserStatus)
            if (newUserStatus === true && kuratorStatus == !true) {
                navigation.navigate('Elev')
            }
            if (newUserStatus === false && kuratorStatus == !true) {
                navigation.navigate('Chatt')
            }
            if (newUserStatus === false && kuratorStatus == true) {
                navigation.navigate('Kurator')
            }
            if (newUserStatus === true && kuratorStatus == true) {
                navigation.navigate('NewKurator')
            }

         })

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
                    <View style={{ flex: 0.5, justifyContent: 'flex-end', /* backgroundColor: 'lightpink' */ }}>
                        <Logo style={{ width: 160, height: 62, marginTop: 30,  }}/>
                    </View>
                    <View style={styles.contcont}>
                        <View style={ styles.logincontainer }>
                            <InputBarLogIn title='Mejl:' keyType='email-address' keys={"mejl"} value={mejl} loginDetails={loginDetails} setLoginDetails={setLoginDetails} />
                            <InputBarLogIn title='Kod:' security={true} keys={"password"} value={password} loginDetails={loginDetails} setLoginDetails={setLoginDetails} />
                        </View>
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
    logincontainer: {
       // flex: 1,
        paddingHorizontal: 20,
        margingBottom: 50,
        paddingBottom: 20,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
    },
    contcont: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default Hem;