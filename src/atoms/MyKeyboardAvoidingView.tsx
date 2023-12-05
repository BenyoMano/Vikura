import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

type MyKeyboardAvoidingViewProps = {
  children: ReactNode;
};

export const MyKeyboardAvoidingView: React.FC<MyKeyboardAvoidingViewProps> = ({
  children,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
});
