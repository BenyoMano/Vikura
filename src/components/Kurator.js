import React from "react";
import { View, StyleSheet } from 'react-native';
import Logo from "./Logo";
import Conv from "./Conv";
import BackButton from './BackButton';

const Kurator = ({ navigation }) => {

    const onPress = () => {
    alert('Pressed')
}
    return (
        <View style={[styles.container, {
            flexDirection: 'column'
        }]}>
            <View style={{ flexDirection: 'row', width: 360 }}>
                <View>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <View style={{ position: 'absolute', left: '50%', right: '50%' }}>
                    <Logo style={{width: 48, height: 48, marginTop: 25}} />
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