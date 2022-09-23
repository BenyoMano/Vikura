import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Logo from "./Logo";
import BackButton from './BackButton';
import Button from "./Button";
import Form from "./Form";
import Welcome from "./Welcome";

const AddUser = ({ navigation }) => {
    const { textStyling, viewStyle } = styles;
    const [modalVisible, setModalVisible] = useState(false);
    const capitalize = 'none'
    const showIfKurator = checkboxState === true ? 'JA' : 'NEJ';
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [userPropToAdd, setUserPropToAdd] = useState({
        firstName: "",
        secondName: "",
        mejl: "",
        password: "",
        personnummer: "",
        firstLogin: true,
        kurator: checkboxState,
    });
    
    // Get user ID, connect with more infodata in Firestore DB ==> 

    async function createUser() {
        await auth().createUserWithEmailAndPassword(userPropToAdd.mejl, userPropToAdd.password).then(() => {
            console.log('User account created & signed in!');
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
        const addPersonalDetails = async () => {
            const refUID = firestore().collection('Users').doc(user.uid);
            await refUID.set({
                firstName: userPropToAdd.firstName,
                secondName: userPropToAdd.secondName,
                personNummer: userPropToAdd.personnummer,
                alias:'',
                firstLogin: userPropToAdd.firstLogin,
                kurator: checkboxState,
            })
        }
        addPersonalDetails().then(() => auth().signOut().then(() => console.log('User signed out!')));
        console.log('Förnamn:', userPropToAdd.firstName)
        console.log('Efternamn:', userPropToAdd.secondName)
        console.log('Mejl', userPropToAdd.mejl)
        console.log('Lösenord', userPropToAdd.password)
        console.log('Personnummer', userPropToAdd.personnummer)
        console.log('[first login]', userPropToAdd.firstLogin)
        console.log('Kurator?:', checkboxState)
        console.log('UID:', user.uid)

        //Clear TextInput fields
        setUserPropToAdd({           
            firstName: "",
            secondName: "",
            mejl: "",
            password: "",
            personnummer: "",
            kurator: "",
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
                        <View style={{ justifyContent: 'center', }}>
                            <Welcome title='Lägg till elev' style={{fontSize: 32, color: 'black', marginTop: 20}} />
                            <Welcome title='Skapa konto:' style={{fontSize: 18, color: 'grey', marginTop: 20, marginBottom: 10}} />
                        </View>

                        <View style={{justifyContent: 'center'}}>
                                <Modal
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <View style={viewStyle.container}>
                                        <View style={viewStyle.label}>
                                            <Text style={textStyling.label}>Namn:</Text>
                                        </View>
                                        <View style={viewStyle.info}>
                                            <Text style={textStyling.info}>{userPropToAdd.firstName} {userPropToAdd.secondName}</Text>
                                        </View>
                                        <View style={viewStyle.label}>
                                            <Text style={textStyling.label}>Mail:</Text>
                                        </View>
                                        <View style={viewStyle.info}>
                                            <Text style={textStyling.info}>{userPropToAdd.mejl}</Text>
                                        </View>
                                        <View style={viewStyle.label}>
                                            <Text style={textStyling.label}>Lösenord:</Text>
                                        </View>
                                        <View style={viewStyle.info}>
                                            <Text style={textStyling.info}>{userPropToAdd.password}</Text>
                                        </View>
                                        <View style={viewStyle.label}>
                                            <Text style={textStyling.label}>Personnummer:</Text>
                                        </View>
                                        <View style={viewStyle.info}>
                                            <Text style={textStyling.info}>{userPropToAdd.personnummer}</Text>
                                        </View>
                                        <View style={viewStyle.label}>
                                            <Text style={textStyling.label}>Kurator:</Text>
                                        </View>
                                        <View style={viewStyle.info}>
                                            <Text style={textStyling.info}> {showIfKurator} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                                        <Pressable style={[viewStyle.button, {margin: 10}]} onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={textStyling.label}>Tillbaka</Text>
                                        </Pressable>
                                        <Pressable style={[viewStyle.button, {margin: 10}]} onPress={() => {createUser(); setModalVisible(!modalVisible);} }>
                                            <Text style={textStyling.label}>Bekräfta</Text>
                                        </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            
                        <View style={{flex: 3 }}>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                                <Form userPropToAdd={userPropToAdd} setUserPropToAdd={setUserPropToAdd} checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
                            </ScrollView>
                        </View>
                        
                        <View style={{ marginBottom: 10 }}>
                            <Button title='Registrera' onPress={() => setModalVisible(true)} />
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    textStyling: {
        label: {
         fontSize: 20,
            color: 'black',
            fontFamily: 'NunitoSans-Regular',
        },
        info: {
            fontSize: 20,
            color: 'grey',
            fontFamily: 'NunitoSans-Regular'
        },
    },
//===========================
    viewStyle: {
        container: {
            backgroundColor: "white",
            borderRadius: 20,
            alignSelf: 'center',
            top: '28%',
            paddingHorizontal: 15,
            paddingBottom: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 30,
        },
        label: {
            marginLeft: 10,
            marginTop: 30,
        },
        info: {
            marginLeft: 10,
            marginTop: 5,
        },
        button: {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            backgroundColor: 'lightgrey',
        }
        }
});

export default AddUser;