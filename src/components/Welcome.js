import React from "react";
import {Text, View} from 'react-native';

const Welcome = (props) => {
    const { textStyling, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={[props.style, textStyling]}>{props.title}</Text>
        </View>
    );
}

const styles = {
    textStyling: {
       // fontSize: 42,
        color: 'black',
        fontFamily: 'NunitoSans-Regular',
    },

viewStyle: {
        flex: 1,
        top: 90,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 20,
       // backgroundColor: 'grey'
    }
};

export default Welcome;