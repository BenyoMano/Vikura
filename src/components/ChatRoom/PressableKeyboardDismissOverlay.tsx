import React, {useEffect, useState} from 'react';
import {View, Keyboard, Pressable, StyleSheet} from 'react-native';

const PressableKeyboardDismissOverlay = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handlePress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
});

export default PressableKeyboardDismissOverlay;
