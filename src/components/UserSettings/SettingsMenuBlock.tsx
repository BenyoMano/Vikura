import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';

const SettingsMenuBlock = ({
  name,
  type,
  text,
  onPress,
  iconColor,
  textColor,
  setShowBackArrow,
  settingsLevel,
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const slideInAnim = Animated.timing(animatedValue2, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: true,
  });
  const pressInAnim = Animated.timing(animatedValue1, {
    toValue: 1,
    duration: 200,
    easing: Easing.elastic(1.1),
    useNativeDriver: true,
  });
  const pressOutAnim = Animated.timing(animatedValue1, {
    toValue: 0,
    duration: 200,
    easing: Easing.elastic(1.1),
    useNativeDriver: true,
  });

  const slideInInterpolate = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: settingsLevel === 'settings' ? [-10, 0] : [10, 0],
  });
  const fadeInOpacity = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const pressInInterpolate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });
  const animatedPressSlide = {
    transform: [{translateX: pressInInterpolate}],
  };
  const animatedSlideIn = {
    transform: [{translateX: slideInInterpolate}],
  };

  const handlePress = () => {
    onPress();
    setShowBackArrow(true);
  };

  const onPressin = () => {
    pressInAnim.start();
  };
  const onPressOut = () => {
    pressOutAnim.start();
  };

  useEffect(() => {
    slideInAnim.start();

    return () => {
      slideInAnim.stop();
      animatedValue2.setValue(0);
    };
  }, [settingsLevel]);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressin}
      onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.container,
          animatedSlideIn,
          {
            opacity: fadeInOpacity,
          },
        ]}>
        <View style={styles.iconStyle}>
          <Icon
            name={name}
            type={type}
            color={iconColor ? iconColor : 'black'}
            size={24}
          />
        </View>
        <View style={styles.titleStyle}>
          <Text
            style={[
              styles.textStyle,
              {
                color: textColor ? textColor : 'black',
              },
            ]}>
            {text}
          </Text>
        </View>
        <Animated.View style={[styles.iconStyle, animatedPressSlide]}>
          <Icon name="chevron-right" type="octicon" color="black" size={24} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    zIndex: 30,
    elevation: 30,
  } as ViewStyle,
  iconStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  } as ViewStyle,
  titleStyle: {
    width: '70%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  } as ViewStyle,
  textStyle: {
    color: 'black',
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
  } as TextStyle,
});

export default SettingsMenuBlock;
