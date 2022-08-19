import React, { useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import InputBar from "./InputBar";
import Logo from "./Logo";
import Welcome from './Welcome';
import BackButton from './BackButton';
import InputBarNewDetails from "./InputBarNewDetails";
import auth from '@react-native-firebase/auth';
//import { firestore } from "firebase-admin";
import firestore from '@react-native-firebase/firestore';


const Elev = ({ navigation }) => {
    const [newDetails, setNewDetails] = useState({});
    const security = false
    const capitalize = 'none'
    const {
        password,
        rePassword,
        alias
    } = newDetails

    async function renewDetails() {
        if (rePassword === password) {
            await auth().currentUser.updatePassword(newDetails.password).then(() => {
                console.log('Password updated');
            }).catch(error => {
                if (error.code === 'auth/weak-password') {
                    console.log('Weak password');
                }
                if (error.code === 'auth/requires-recent-login') {
                    console.log('You have to reauthenticate');
                }
                console.error(error);
            });

            await auth().currentUser.updateProfile({
                displayName: alias,
            }).then(() => {
                console.log('Nytt nickname', alias);
            });
        } else {
        console.log('Lösenordet matchar inte!');
        }

        firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(querySnapshot => {
            const currentData = querySnapshot.data()
            console.log('Current Data:', currentData)
             firestore().collection('Users').doc(auth().currentUser.uid).set({
                ...currentData,
                firstLogin: false,
                alias: alias
                
            }) 
     })
    }
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, {
                    flexDirection: 'column'
                }]}>    
                    <View style={{ flexDirection: 'row', width: 360 }}>
                        <View>
                            <BackButton onPress={() => navigation.goBack()} />
                        </View>
                        <View style={{ position: 'absolute', left: '50%', right: '50%' }}>
                            <Logo style={{width: 90, height: 35, marginTop: 32}} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Welcome title='Välkommen!' style={{fontSize: 38, color: 'black', top: 40,}} />
                    </View> 
                    <View style={{ flex: 1 }}>
                    <Welcome 
                            title='Första gången du loggar in behöver du skapa ett nytt lösenord samt ett nickname.
                            Ditt nickname kan vara helt påhittat och är bara till för kuratorn ska kunna referera till dig.'
                            style={{fontSize: 18, color: '#7f7f7f', top: 0, paddingHorizontal: 40, }} 
                            />
                    </View>
                    <View style={{flex: 2}}>
                        <InputBarNewDetails title='Ange nytt lösenord:' security={true} keys={"password"} value={password} newDetails={newDetails} setNewDetails={setNewDetails} />
                        <InputBarNewDetails title='Repetera lösenord:' security={true} keys={"rePassword"} value={rePassword} newDetails={newDetails} setNewDetails={setNewDetails} />
                        <InputBarNewDetails title='Ange ett nickname:' capitalize='words' keys={"alias"} value={alias} newDetails={newDetails} setNewDetails={setNewDetails} />
                    </View>
                    <View style={{flex: 1}}>
                        <Button title='Bekräfta' onPress={() => renewDetails()} />
                        <Button title='Starta chatt' onPress={() => 
                        navigation.navigate('Kurator')} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
});

export default Elev;