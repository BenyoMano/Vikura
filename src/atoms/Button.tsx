import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  const {containerStyle, btnTextStyle, btnContainerStyle} = styles;
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        testID="button"
        onPressIn={fadeIn}
        onPressOut={fadeOut}>
        <Animated.View
          style={[
            btnContainerStyle,
            {
              opacity: animated,
            },
          ]}>
          <Text style={btnTextStyle}>{title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  btnContainerStyle: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 18,
    marginVertical: 10,
    width: 230,
    borderRadius: 12,
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default Button;
