import React from 'react';
import {useEffect} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Easing,
  Animated,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Path, Svg} from 'react-native-svg';

type AdjustSizeButtonProps = {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdjustSizeButton: React.FC<AdjustSizeButtonProps> = ({
  isToggled,
  setIsToggled,
  setIsVisible,
}) => {
  const {btnContainerStyle} = styles;

  const animatedValue = new Animated.Value(0);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const pathInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'M3 17V19H10V17H3ZM3 5V7H14V5H3ZM13 21V15H11V21H13M14 19H21V17H14ZM7 9V15H9V9H7M6 13H3V11H6ZM21 13V11H10V13H21M15 9H17V3H15V9M18 5V7 7H21V5H18',
      'M3 17V19H5V17H3ZM3 5V7H7V5H3ZM8 21V15H6V21H8M9 19H21V17H9ZM15 9V15H17V9H15M14 13H3V11H14ZM21 13V11H18V13H21M8 9H10V3H8V9M11 5V7 7H21V5H11',
    ],
  });

  const pressAnim = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const pressInAnim1 = Animated.timing(animatedValue, {
    toValue: 0.25,
    duration: 25,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const pressInAnim2 = Animated.timing(animatedValue, {
    toValue: 0.75,
    duration: 25,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const pressOutAnim1 = Animated.timing(animatedValue, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const pressOutAnim2 = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onPress = () => {
    setIsToggled(prev => !prev);
    setIsVisible(true);
  };

  const handlePressInAnimation = () => {
    if (!isToggled) {
      pressInAnim1.start();
    }
    if (isToggled) {
      pressInAnim2.start();
    }
  };

  const handlePressOutAnimation = () => {
    if (!isToggled) {
      pressOutAnim1.start();
    }
    if (isToggled) {
      pressOutAnim2.start();
    }
  };

  useEffect(() => {
    if (isToggled) {
      animatedValue.setValue(0.25);
      pressAnim.start();
    }
    if (!isToggled) {
      animatedValue.setValue(0.75);
      pressOutAnim1.start();
    }
  }, [isToggled]);

  return (
    <View>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
        style={btnContainerStyle}>
        <Svg height="35" width="35" viewBox="0 0 24 24">
          <AnimatedPath d={pathInterpolation} />
        </Svg>
      </Pressable>
      {isToggled && (
        <View style={styles.arrow}>
          <Icon name="arrow-drop-down" type="materialicons" size={30} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerStyle: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  arrow: {
    position: 'absolute',
    alignSelf: 'center',
    top: 43,
  } as ViewStyle,
});

export default AdjustSizeButton;
