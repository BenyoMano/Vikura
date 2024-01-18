import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useIndicator} from '../useIndicator';

type RequestDeleteButtonProps = {
  onPress: () => void;
};

const RequestDeleteButton: React.FC<RequestDeleteButtonProps> = ({onPress}) => {
  const {buttonContainerStyle} = styles;
  const animatedValue = new Animated.Value(0);
  const {anyIndicator} = useIndicator();

  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-20deg', '20deg'],
  });

  const handlePressInAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  };

  return (
    <View style={styles.viewStyle}>
      {anyIndicator && <View style={styles.indicatorStyle} />}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
        style={buttonContainerStyle}>
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name="inbox" type="octicon" color="black" size={24} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderRadius: 10,
    overflow: 'visible',
    width: 40,
    marginRight: 15,
  },
  buttonContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    marginRight: 15,
  } as ViewStyle,
  indicatorStyle: {
    position: 'absolute',
    right: -3,
    top: -3,
    width: 12,
    height: 12,
    borderRadius: 30,
    backgroundColor: '#CC2020',
    zIndex: 1,
    elevation: 1,
  } as ViewStyle,
});

export default RequestDeleteButton;
