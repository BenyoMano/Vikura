import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import {Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';

type SendMailButtonProps = {
  title: string;
  detailsToSend: string;
};

const SendMailButton: React.FC<SendMailButtonProps> = ({
  title,
  detailsToSend,
}) => {
  const {viewStyle, btnContainerStyle, btnTextStyle} = styles;
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
    <View style={viewStyle}>
      <Pressable
        onPress={() => {
          Linking.openURL(
            'mailto:?subject=Orosanm%C3%A4lan&body=' +
              encodeURIComponent(detailsToSend),
          ).catch(error => {
            showMessage({
              message: 'Misslyckades!',
              description: String(error),
              type: 'danger',
              autoHide: false,
            });
          });
        }}
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
  viewStyle: {
    flex: 0.5,
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  btnContainerStyle: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 18,
    width: 230,
    borderRadius: 12,
  } as ViewStyle,
  btnTextStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Regular',
  } as ViewStyle,
});

export default SendMailButton;
