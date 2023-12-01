import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Easing} from 'react-native';
import {useFontSize} from './FontSizeContext';
import {Slider} from '@miblanchard/react-native-slider';
import {CustomTrackIndicator, CustomTrackMark} from './CustomTrackMark';
import {Icon} from 'react-native-elements';
import {Animated} from 'react-native';

export const FontSizeSlider = React.memo(({isToggled, setIsVisible}) => {
  const {fontSize, updateFontSize} = useFontSize();
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));
  const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));

  const MemoizedTrackMark = React.memo(() => (
    <CustomTrackMark index={'default'} />
  ));

  const MemoizedTrackIndicator = React.memo(() => (
    <CustomTrackIndicator index={fontSize} />
  ));
  const minimumValue = 8;
  const maximumValue = 26;

  const rotateInAnim = Animated.timing(animatedValue1, {
    toValue: 1,
    duration: 50,
    useNativeDriver: true,
  });
  const rotateOutAnim = Animated.timing(animatedValue1, {
    toValue: 0,
    duration: 50,
    useNativeDriver: true,
  });
  const rotatePressedAnim = Animated.timing(animatedValue2, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  });
  const introAnim = Animated.timing(animatedValue3, {
    toValue: 1,
    duration: 300,
    easing: Easing.elastic(1.5),
    useNativeDriver: true,
  });
  const outroAnim = Animated.timing(animatedValue3, {
    toValue: 0,
    duration: 75,
    useNativeDriver: true,
  });

  const buttonRotatePressIn = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '60deg'],
  });
  const buttonRotatePress = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
  const componentOpacity = animatedValue3.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
  });
  const componentTranslate = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const onPress = () => {
    updateFontSize(14);
    animatedValue2.setValue(0);
    rotatePressedAnim.start();
  };
  const onPressOut = () => {
    rotateOutAnim.start();
  };
  const onPressIn = () => {
    rotateInAnim.start();
  };

  const rotateStyling = {
    transform: [{rotateZ: buttonRotatePressIn}, {rotateZ: buttonRotatePress}],
  };
  const componentStyling = {
    opacity: componentOpacity,
    transform: [{translateY: componentTranslate}],
  };

  useEffect(() => {
    if (isToggled) {
      introAnim.start();
    }
    if (!isToggled) {
      outroAnim.start();
      setTimeout(() => {
        setIsVisible(false);
      }, 25);
    }
    return () => {
      introAnim.stop();
      outroAnim.stop();
    };
  }, [isToggled]);

  return (
    <Animated.View style={[styles.constainer, componentStyling]}>
      <View style={{width: '70%'}}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={fontSize}
          onValueChange={updateFontSize}
          step={1}
          minimumTrackTintColor="lightblue"
          thumbStyle={{width: 20, height: 20, borderRadius: 30, left: -7}}
          thumbTintColor="lightblue"
          trackClickable={true}
          renderTrackMarkComponent={() => <MemoizedTrackMark />}
          renderAboveThumbComponent={() => <MemoizedTrackIndicator />}
          trackMarks={[14]}
        />
      </View>
      <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
        <Animated.View style={[rotateStyling, styles.buttonContainer]}>
          <View style={{transform: [{scaleX: -1}, {rotate: '60deg'}]}}>
            <Pressable
              onPress={onPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Icon name="redo" type="fontisto" size={20} />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  constainer: {
    position: 'absolute',
    right: 0,
    top: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    width: 150,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
    zIndex: 3,
  },
  textStyle: {
    fontSize: 14,
  },
});
