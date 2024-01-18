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

type ConfirmButtonProps = {
  title: string;
  onPress: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({title, onPress}) => {
  const {viewStyle, btnContainerStyle, btnTextStyle} = styles;
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
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
    <View style={viewStyle}>
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={onPress}
        testID="ConfirmButton">
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

export const styles = StyleSheet.create({
  viewStyle: {
    marginVertical: 10,
    // borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  btnContainerStyle: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default ConfirmButton;
