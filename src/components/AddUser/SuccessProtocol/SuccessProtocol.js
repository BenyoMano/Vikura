import React, {useState} from 'react';
import {Animated, Pressable, View} from 'react-native';
import {AnimatedIcon} from './AnimatedIcon';
import {useEffect} from 'react';
import {Easing} from 'react-native';

const SuccessProtocol = ({
  actionStates,
  successProtocol,
  setSuccessProtocol,
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));
  const {action1, action2, action3, action4} = actionStates;
  const [allActionsFinished, setAllActionsFinished] = useState(false);

  const animatedIconObject1 = {
    actionFinished: action1,
    name: 'adduser',
    type: 'antdesign',
    color: 'black',
    size: 35,
  };
  const animatedIconObject2 = {
    actionFinished: action2,
    name: 'card-account-details-outline',
    type: 'material-community',
    color: 'black',
    size: 35,
  };
  const animatedIconObject3 = {
    actionFinished: action3,
    name: 'chatbubbles-outline',
    type: 'ionicon',
    color: 'black',
    size: 35,
  };
  const animatedIconObject4 = {
    actionFinished: action4,
    name: 'log-out',
    type: 'feather',
    color: 'black',
    size: 35,
  };

  const introAnim = Animated.sequence([
    Animated.timing(animatedValue2, {
      toValue: 1,
      easing: Easing.ease,
      duration: 50,
      useNativeDriver: false,
    }),
    Animated.timing(animatedValue1, {
      toValue: 1,
      easing: Easing.ease,
      duration: 150,
      useNativeDriver: false,
    }),
  ]);

  const outroAnim = Animated.timing(animatedValue1, {
    toValue: 0,
    easing: Easing.ease,
    duration: 150,
    useNativeDriver: false,
  });

  const expandStyle = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '90%'],
  });
  const paddingStyle1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 30],
  });
  const paddingStyle2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const styles = {
    outerContainer: {
      position: 'absolute',
      top: '40%',
      width: expandStyle,
      backgroundColor: 'white',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 12,
      zIndex: 30,
      elevation: 30,
    },
    innerContainer: {
      width: '100%',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: paddingStyle1,
      paddingVertical: paddingStyle2,
    },
  };

  const onPress = () => {
    setSuccessProtocol(false);
  };

  useEffect(() => {
    if (
      [action1, action2, action3, action4].every(action => action === 'success')
    ) {
      setAllActionsFinished(true);
    }
  }, [action1, action2, action3, action4]);

  useEffect(() => {
    if (successProtocol) {
      introAnim.start();
    }
    if (allActionsFinished) {
      setTimeout(() => {
        outroAnim.start();
      }, 1300);
      setTimeout(() => {
        setSuccessProtocol(false);
      }, 1450);
    }
    return () => {
      introAnim.stop();
      outroAnim.stop();
    };
  }, [successProtocol, allActionsFinished]);

  return (
    <Animated.View style={styles.outerContainer}>
      <Pressable onPress={onPress}>
        <Animated.View style={styles.innerContainer}>
          <AnimatedIcon
            animatedIconObject={animatedIconObject1}
            successProtocol={successProtocol}
            allActionsFinished={allActionsFinished}
          />
          <AnimatedIcon
            animatedIconObject={animatedIconObject2}
            successProtocol={successProtocol}
            allActionsFinished={allActionsFinished}
          />
          <AnimatedIcon
            animatedIconObject={animatedIconObject3}
            successProtocol={successProtocol}
            allActionsFinished={allActionsFinished}
          />
          <AnimatedIcon
            animatedIconObject={animatedIconObject4}
            successProtocol={successProtocol}
            allActionsFinished={allActionsFinished}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default SuccessProtocol;
