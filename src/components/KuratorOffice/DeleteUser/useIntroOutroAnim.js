import {useEffect, useState} from 'react';
import {Animated} from 'react-native';

export const useIntroOutroAnim = ({
  closingModal,
  modalVisible,
  setModalVisible,
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));

  const introConfig = {
    toValue: 1,
    duration: 380,
    useNativeDriver: false,
  };
  const outroConfig = {
    toValue: 0,
    duration: 100,
    useNativeDriver: false,
  };

  const buttonTranslate = animatedValue1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-15, -15, 0],
  });
  const buttonOpacity = animatedValue2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.0, 1],
  });

  const animatedTranslateStyle = {
    transform: [{translateY: buttonTranslate}],
    opacity: buttonOpacity,
  };

  const anim1 = Animated.timing(animatedValue1, introConfig);
  const anim2 = Animated.timing(animatedValue2, introConfig);
  const anim3 = Animated.timing(animatedValue1, outroConfig);
  const anim4 = Animated.timing(animatedValue2, outroConfig);

  useEffect(() => {
    anim1.start();
    anim2.start();

    return () => {
      anim1.stop();
      anim2.stop();
    };
  }, []);

  useEffect(() => {
    if (closingModal) {
      anim3.start();
      anim4.start();
      setTimeout(() => {
        setModalVisible(!modalVisible);
      }, 300);
    }

    return () => {
      anim3.stop();
      anim4.stop();
    };
  }, [closingModal, modalVisible, setModalVisible]);

  return {animatedTranslateStyle};
};
