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
  selectedTab: 'delete' | 'problem' | 'feedback';
  id: 'delete' | 'problem' | 'feedback';
  problemIndicator?: boolean;
  feedbackIndicator?: boolean;
  deleteIndicator?: boolean;
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({
  title,
  selectedTab,
  id,
  problemIndicator,
  feedbackIndicator,
  deleteIndicator,
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
        <View style={styles.indicatorContainer}>
          {(feedbackIndicator || deleteIndicator || problemIndicator) && (
            <View style={styles.indicatorStyle} />
          )}
        </View>
        <Text style={[btnTextStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  btnContainerStyle: {
    flexDirection: 'row',
    borderRadius: 50,
    borderWidth: 1.5,
    marginHorizontal: 5,
    paddingRight: 20,
    paddingLeft: 15,
    paddingVertical: 5,
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  } as ViewStyle,
  indicatorStyle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#CC2020',
  } as ViewStyle,
});

export default TabButton;
