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

type UpdateButtonProps = {
  title: string;
  onPress: () => void;
};

const UpdateButton: React.FC<UpdateButtonProps> = ({title, onPress}) => {
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
      <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
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
    borderRadius: 8,
    overflow: 'hidden',
  } as ViewStyle,
  btnContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#43D37E',
  } as ViewStyle,
  btnTextStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  } as TextStyle,
});

export default UpdateButton;
