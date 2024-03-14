import React, { useEffect } from 'react';
import {Easing, ViewStyle} from 'react-native';
import {Animated} from 'react-native';
import {View, Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NotificationsButton: React.FC = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const {notificationsButtonContainerStyle} = styles;
  const animatedValue = new Animated.Value(0);

  const buttonRotate = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-20deg', '20deg'],
  });

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user?.uid;

    const unsubscribe = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        if (data && data.isNotificationsEnabled !== undefined) {
          setIsEnabled(data.isNotificationsEnabled);
        }
      });

      return unsubscribe;
  }, []);

  const handlePressInAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(()=>{
      const newIsEnabled = !isEnabled;

      setIsEnabled(newIsEnabled);
      const user = auth().currentUser;
      const userId = user?.uid;

      firestore().collection('Users').doc(userId).update({
        isNotificationsEnabled: newIsEnabled
      });
    });
  };

  const animatedRotateStyle = {
    transform: [{rotateZ: buttonRotate}],
  };

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
        style={notificationsButtonContainerStyle}>
        <Animated.View style={[animatedRotateStyle]}>
          <Icon name={isEnabled ? "notifications": "notifications-off"} type="material" color="black" size={24} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsButtonContainerStyle: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
    marginRight: 15,
  } as ViewStyle,
});

export default NotificationsButton;
