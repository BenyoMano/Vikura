import React, { useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import InputBar from "./InputBar";
import Logo from "./Logo";
import Welcome from './Welcome';
import BackButton from './BackButton';
import InputBarNewDetails from "./InputBarNewDetails";

const Elev = ({ navigation }) => {
    const [newDetails, setNewDetails] = useState({});
    const {
        password,
        rePassword,
        alias
    } = newDetails

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
                        <InputBarNewDetails title='Ange nytt lösenord:' keys={"password"} value={password} newDetails={newDetails} setNewDetails={setNewDetails} />
                        <InputBarNewDetails title='Repetera lösenord:' keys={"rePassword"} value={rePassword} newDetails={newDetails} setNewDetails={setNewDetails} />
                        <InputBarNewDetails title='Ange ett nickname:' keys={"alias"} value={alias} newDetails={newDetails} setNewDetails={setNewDetails} />
                    </View>
                    <View style={{flex: 1}}>
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