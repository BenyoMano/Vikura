import React, { useEffect, useRef } from 'react';
import {Image, Animated} from 'react-native';

const SmallLogo = () => {
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
        source={require('./../../assets/images/transparent.png')}
        style={{width: 90, height: 35}}
      />
    </Animated.View>
  );
};

const styles = {
  ViewStyle: {
    position: 'absolute',
    left: '37.5%',
  },
};

export default SmallLogo;
