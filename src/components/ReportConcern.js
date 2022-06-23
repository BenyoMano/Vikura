import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Logo from "./Logo";
import BackButton from './BackButton';
import Welcome from "./Welcome";
import Button from "./Button";
import CopyButton from "./CopyButton";
import { Icon } from "react-native-elements";

const ReportConcern = ({ navigation }) => {

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
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', flex: 0.4, width: 360 }}>
                <View>
                    <Welcome title="Orosanmälan" style={{ fontSize: 32, marginRight: 5, top: 40, color: 'black' }} />
                </View>
                <>
                    <Icon name='warning' type='antdesign' color='grey' size={35} />
                </>
            </View>
            <View style={{flex: 0.4}}>
                <Welcome title='Personuppgifter:' style={{ fontSize: 18, top: 0, color: 'grey'}} />
            </View>
            <View style={ styles.viewStyle}>
                
            </View>
            <View style={{ width: 360, alignItems: 'flex-end' }}>
                <CopyButton />
            </View>
            <View style={{ flex: 0.5 }}>
                <Button title='Gör något'/>
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
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 10,
        //marginBottom: 22,
        height: 250,
        width: 360,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 12,
    },
});

export default ReportConcern;