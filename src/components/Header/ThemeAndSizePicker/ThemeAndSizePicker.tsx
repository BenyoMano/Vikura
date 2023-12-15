import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle, Animated} from 'react-native';
import {componentOpacity, componentTranslate} from './SliderAnimations';
import {FontSizeSlider} from './FontSizeSlider';
import {ColorThemePicker} from './ColorThemePicker';

type ThemeAndSizePickerProps = {
  isToggled: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeAndSizePicker: React.FC<ThemeAndSizePickerProps> = ({
  isToggled,
  setIsVisible,
}) => {
  const componentStyling = {
    opacity: componentOpacity,
    transform: [{translateY: componentTranslate}],
  };

  return (
    <Animated.View style={[styles.constainer, componentStyling]}>
      <FontSizeSlider isToggled={isToggled} setIsVisible={setIsVisible} />
      <ColorThemePicker />
    </Animated.View>
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
