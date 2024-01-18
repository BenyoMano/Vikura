import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {requestDelete} from '../../../../firebase/UserManagement/DeleteUser/requestDelete';
import auth from '@react-native-firebase/auth';
import useUserPersonalDetails from '../../../../firebase/userDetails';

type RequestDeleteButtonProps = {
  hasRequested: boolean;
  setHasRequested: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequestDeleteButton: React.FC<RequestDeleteButtonProps> = ({
  hasRequested,
  setHasRequested,
}) => {
  const {btnContainerStyle, btnTextStyle} = styles;
  const animated = new Animated.Value(1);
  const clientUserId = auth().currentUser?.uid;
  const userDetails = useUserPersonalDetails({clientUserId});

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

  const onPress = () => {
    requestDelete({clientUserId, userDetails, setHasRequested});
  };

  const variableContainerStyle = {
    borderColor: !hasRequested ? 'red' : 'grey',
  };
  const variableTextStyle = {
    color: !hasRequested ? 'red' : 'grey',
  };

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
      <Animated.View
        style={[
          btnContainerStyle,
          {
            opacity: animated,
          },
          variableContainerStyle,
        ]}>
        <Text style={[btnTextStyle, variableTextStyle]}>
          {!hasRequested ? 'Skicka Begäran' : 'Begäran Skickad'}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  btnContainerStyle: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  } as ViewStyle,
  btnTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});

export default RequestDeleteButton;
