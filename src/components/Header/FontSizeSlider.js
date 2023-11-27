import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useFontSize} from './FontSizeContext';
import {MotiView} from 'moti';
import {Slider} from '@miblanchard/react-native-slider';
import {CustomTrackIndicator, CustomTrackMark} from './CustomTrackMark';
import {Icon} from 'react-native-elements';
import {Animated} from 'react-native';

export const FontSizeSlider = () => {
  const {fontSize, updateFontSize} = useFontSize();
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

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
  const buttonRotatePressIn = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '60deg'],
  });
  const buttonRotatePress = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
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

  return (
    <MotiView
      from={{opacity: 0, translateY: 0}}
      animate={{opacity: 1, translateY: 20}}
      exit={{opacity: 0, translateY: 0}}
      transition={{type: 'spring', duration: 500}}
      exitTransition={{type: 'timing', duration: 75}}
      style={styles.constainer}>
      <View style={{width: '70%'}}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={fontSize}
          onValueChange={updateFontSize}
          step={1}
          // maximumTrackTintColor="#FD924D"
          minimumTrackTintColor="lightblue"
          // minimumTrackTintColor="#156C17"
          thumbStyle={{width: 20, height: 20, borderRadius: 30, left: -7}}
          thumbTintColor="lightblue"
          // thumbTouchSize={{width: 100, height: 40}}
          trackClickable={true}
          renderTrackMarkComponent={() => <CustomTrackMark index={'default'} />}
          renderAboveThumbComponent={() => (
            <CustomTrackIndicator index={fontSize} />
          )}
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
    </MotiView>
  );
};

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
