import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from "./Button";
import InputBar from "./InputBar";
import Logo from "./Logo";
import Welcome from './Welcome';

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
                        <Logo style={{ width: 145, height: 145, marginTop: 50 }}/>
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