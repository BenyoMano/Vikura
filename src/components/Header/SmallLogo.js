import React, {useEffect, useRef} from 'react';
import {Image, Animated, View} from 'react-native';

const SmallLogo = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.ViewStyle, {opacity: fadeAnim}]}>
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default SmallLogo;
