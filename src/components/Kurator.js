import React from "react";
import { View, StyleSheet } from 'react-native';
import Logo from "./Logo";
import Conv from "./Conv";
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';

const Kurator = ({ navigation }) => {

    return (
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
                <View style={{ position: 'absolute', left: '80%' }}>
                    <AddUserButton onPress={() => 
                        navigation.navigate('AddUser')} />
                </View>
            </View>
            <View style={{flex: 1}}>
                <Conv />
            </View>
        </View>
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

export default Kurator;