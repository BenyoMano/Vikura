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

type TabButtonProps = {
  title: string;
  selectedTab: 'delete' | 'problem';
  id: 'delete' | 'problem';
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({
  title,
  selectedTab,
  id,
  onPress,
}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
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
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
      <Animated.View
        style={[
          btnContainerStyle,
          {
            opacity: animated,
            borderColor: selectedTab === id ? '#329DFF' : '#696969',
          },
        ]}>
        <Text style={[btnTextStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  btnContainerStyle: {
    borderRadius: 50,
    borderWidth: 1.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default TabButton;
