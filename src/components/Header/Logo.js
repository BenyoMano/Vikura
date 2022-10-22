import React from 'react';
import {Image, View} from 'react-native';

const Logo = props => {
  const {ViewStyle} = styles;

  return (
    <View style={ViewStyle}>
      <Image
        source={require('./../../assets/images/vikuraCut.jpg')}
        style={props.style}
      />
    </View>
  );
};

const styles = {
  ViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
};

export default Logo;
