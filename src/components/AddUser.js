import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from "./Logo";
import BackButton from './BackButton';
import Button from "./Button";
import Form from "./Form";
import Welcome from "./Welcome";

const AddUser = ({ navigation }) => {

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
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Welcome title='Lägg till elev' style={{fontSize: 32, color: 'black', marginTop: 70}} />
                            <Welcome title='Skapa konto:' style={{fontSize: 18, color: 'grey', marginTop: 40}} />
                        </View>
                        <View style={{flex: 2}}>
                            <Form />
                        </View>
                            <View style={{ marginBottom: 30 }}>
                                <Button title='Registrera' />
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

export default AddUser;