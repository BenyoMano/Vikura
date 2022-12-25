import React, { useEffect, useRef } from 'react';
import {Image, View, Animated} from 'react-native';

const Logo = props => {
  const {ViewStyle} = styles;
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View style={[ViewStyle, {opacity: fadeAnim}]}>
      
      <Image
        source={require('./../../assets/images/vikuraCut.jpg')}
        style={props.style}
      />
    </Animated.View>
  );
};

const styles = {
  ViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
   // marginBottom: 10,
  },
};

export default Logo;
