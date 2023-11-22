import {MotiView} from 'moti';
import React from 'react';
import {Image} from 'react-native';

const Logo = () => {
  const {ViewStyle} = styles;

  return (
    <MotiView style={ViewStyle} animate={{opacity: 1}}>
      <Image
        source={require('./../../assets/images/transparent.png')}
        style={{width: 220, height: 82, marginTop: 110}}
      />
    </MotiView>
  );
};

const styles = {
  ViewStyle: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Logo;
