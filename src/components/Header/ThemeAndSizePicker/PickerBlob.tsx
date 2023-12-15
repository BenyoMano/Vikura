import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Pressable, ViewStyle} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {useBubbleColor} from './BubbleColorContext';

type PickerBlobProps = {
  id: number;
  fill1: string;
  fill2: string;
};

export const PickerBlob: React.FC<PickerBlobProps> = React.memo(
  ({id, fill1, fill2}) => {
    const {backgroundColorId, updateBackgroundColorId} = useBubbleColor();
    const colorPath1 = 'M16 3 4 17A1 1 0 0116 3';
    const colorPath2 = 'M16 3 4 17A1 1 0 0016 3';
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;

    const pressedRotate = animatedValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '60deg', '0deg'],
    });

    const pressedScale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.3],
    });

    const pressedAnim = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.elastic(2),
      useNativeDriver: true,
    });

    const unPressedAnim = Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.elastic(2),
      useNativeDriver: true,
    });

    const pressedInAnim = Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(2),
      useNativeDriver: true,
    });

    const scaleStyling = {
      transform: [{scale: pressedScale}, {rotateZ: pressedRotate}],
    };

    const onPress = ({newId}) => {
      updateBackgroundColorId(newId);
    };

    const onPressIn = () => {
      pressedInAnim.start(() => animatedValue2.setValue(0));
    };

    useEffect(() => {
      if (backgroundColorId === id) {
        pressedAnim.start();
      }
      if (backgroundColorId !== id) {
        unPressedAnim.start();
      }
      return () => {
        pressedAnim.stop();
        unPressedAnim.stop();
      };
    }, [backgroundColorId]);

    return (
      <Pressable onPress={() => onPress({newId: id})} onPressIn={onPressIn}>
        <Animated.View
          style={[
            scaleStyling,
            backgroundColorId === id
              ? styles.shadowContainerOn
              : styles.shadowContainerOff,
          ]}>
          <Svg height={30} width={30} viewBox="0 0 20 20">
            <Path d={colorPath1} fill={fill1} />
            <Path d={colorPath2} fill={fill2} />
          </Svg>
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = {
  shadowContainerOn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    zIndex: 5,
    elevation: 5,
    borderRadius: 35,
  } as ViewStyle,
  shadowContainerOff: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 35,
  } as ViewStyle,
};
