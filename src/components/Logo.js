import React from 'react'
import { Image, View } from 'react-native'

const Logo = (props) => {
    const { ViewStyle } = styles;

    return (
        <View style={ViewStyle}>
            <Image source={require('./../assets/images/OTLogo.png')} style={props.style} />
        </View>
    )
}

const styles = {
    ViewStyle: {
        justifyContent: "center",
        alignItems: 'center',
       // backgroundColor: 'lightgreen',
       // marginTop: 60,
        marginBottom: 10,
    }
}

export default Logo;