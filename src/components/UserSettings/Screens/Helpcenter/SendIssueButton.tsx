import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {HCSettingsChoice} from './HelpcenterScreen';
import {reportIssue} from '../../../../firebase/UserManagement/Issue/reportIssue';
import useUserPersonalDetails from '../../../../firebase/userDetails';
import auth from '@react-native-firebase/auth';

type SendIssueButtonProps = {
  title: string;
  settingsChoice: HCSettingsChoice;
  messageToSend: string;
  setMessageToSend: React.Dispatch<React.SetStateAction<string>>;
};

const SendIssueButton: React.FC<SendIssueButtonProps> = ({
  title,
  settingsChoice,
  messageToSend,
  setMessageToSend,
}) => {
  const clientUserId = auth().currentUser?.uid;
  const userDetails = useUserPersonalDetails({clientUserId});
  const {btnTextStyle, btnContainerStyle} = styles;
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

  const onPress = () => {
    reportIssue({
      settingsChoice,
      messageToSend,
      setMessageToSend,
      userDetails,
      clientUserId,
    });
  };

  return (
    <Pressable onPress={onPress} onPressIn={fadeIn} onPressOut={fadeOut}>
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
  );
};

const styles = StyleSheet.create({
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

export default SendIssueButton;
