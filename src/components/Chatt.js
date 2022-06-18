import React, { useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from "./Logo";
import BackButton from './BackButton';
import ChattRuta from "./ChattRuta";
import InputBarChatt from "./InputBarChatt";
import ButtonSend from "./ButtonSend";
import sendMessage from "./sendMessage";

const Chatt = ({ navigation }) => {
    const [msgToSend, setMsgToSend] = useState();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, {
                    flexDirection: 'column'
                }]}>
                    <View style={{ flexDirection: 'row', width: 360 }}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <BackButton onPress={() => navigation.goBack()} />
                        </View>
                        <View style={{ position: 'absolute', left: '50%', right: '50%' }}>
                            <Logo style={{width: 90, height: 35, marginTop: 32}} />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <ChattRuta />
                    </View>
                        <View style={{ flexDirection: 'row', width: 360, marginBottom: 30 }}>
                            <View style={{ justifyContent: 'flex-start'}}>
                                <InputBarChatt msgToSend={msgToSend} setMsgToSend={setMsgToSend}/>
                            </View>
                            <View style={{ position: 'absolute', right: '0%'}}>
                                <ButtonSend title='Skicka'
                                 onPress={() => {sendMessage({msgToSend}); setMsgToSend(""); } } />
                            </View>
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

export default Chatt;