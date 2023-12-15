import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import {useFontSize} from './FontSizeContext';
import {Slider} from '@miblanchard/react-native-slider';
import {CustomTrackIndicator, CustomTrackMark} from '../CustomTrackMark';
import {Icon} from 'react-native-elements';
import {
  animatedValue2,
  buttonRotatePress,
  buttonRotatePressIn,
  componentOpacity,
  componentTranslate,
  introAnim,
  outroAnim,
  rotateInAnim,
  rotateOutAnim,
  rotatePressedAnim,
} from './SliderAnimations';

type FontSizeSliderProps = {
  isToggled: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FontSizeSlider: React.FC<FontSizeSliderProps> = ({
  isToggled,
  setIsVisible,
}) => {
  const {fontSize, updateFontSize} = useFontSize();

  const MemoizedTrackMark = React.memo(() => (
    <CustomTrackMark index={'default'} />
  ));

  const MemoizedTrackIndicator = React.memo(() => (
    <CustomTrackIndicator index={fontSize} />
  ));
  const minimumValue = 8;
  const maximumValue = 26;

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
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '70%', paddingRight: 10}}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={fontSize}
          onValueChange={updateFontSize}
          step={1}
          minimumTrackTintColor="lightblue"
          thumbStyle={{
            width: 20,
            height: 20,
            borderRadius: 30,
            left: 10,
          }}
          thumbTintColor="lightblue"
          trackClickable={true}
          renderTrackMarkComponent={() => <MemoizedTrackMark />}
          renderAboveThumbComponent={() => <MemoizedTrackIndicator />}
          trackMarks={[14]}
        />
      </View>
      <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
        <Animated.View style={rotateStyling}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    position: 'absolute',
    right: 0,
    top: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    width: 170,
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
  } as ViewStyle,
  textStyle: {
    fontSize: 14,
  } as TextStyle,
});
