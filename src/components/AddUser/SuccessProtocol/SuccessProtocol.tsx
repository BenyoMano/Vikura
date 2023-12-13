import React, {useState} from 'react';
import {Animated, Pressable, ViewStyle} from 'react-native';
import {AnimatedIcon} from './AnimatedIcon';
import {useEffect} from 'react';
import {Easing} from 'react-native';

import {Action} from '../AddUserScreen';

export type AnimatedIconObject = {
  actionFinished: 'initial' | 'failed' | 'success';
  name: string;
  type: string;
  color: string;
  size: number;
};

export type SuccessProtocolProps = {
  actionStates: Record<string, Action>;
  successProtocol: boolean;
  setSuccessProtocol: React.Dispatch<React.SetStateAction<boolean>>;
  setAllDone?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessProtocol: React.FC<SuccessProtocolProps> = ({
  actionStates,
  successProtocol,
  setSuccessProtocol,
  ...props
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));
  const [allActionsFinished, setAllActionsFinished] = useState(false);
  const numberOfIcons = Object.keys(actionStates).length;

  const animatedIcons: AnimatedIconObject[] = Object.values(actionStates).map(
    (action, index): AnimatedIconObject => ({
      actionFinished: action.status as 'initial' | 'failed' | 'success',
      name: action.name,
      type: action.type,
      color: 'black',
      size: 35,
    }),
  );

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
    outputRange: [0, numberOfIcons * 82 + 42],
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
      position: 'absolute' as const,
      top: '40%',
      width: expandStyle as unknown as 'string' | 'number',
      maxWidth: '100%',
      backgroundColor: 'white',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 12,
      zIndex: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.4,
      shadowRadius: 15,
      elevation: 30,
    },
    innerContainer: {
      width: '100%',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: paddingStyle1 as unknown as 'string' | 'number',
      paddingVertical: paddingStyle2 as unknown as 'string' | 'number',
    },
  };

  const onPress = () => {
    setSuccessProtocol(false);
  };

  useEffect(() => {
    const allSuccess = Object.values(actionStates).every(
      action => action.status === 'success',
    );
    setAllActionsFinished(allSuccess);
  }, [actionStates]);

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
        if (props.setAllDone && typeof props.setAllDone === 'function') {
          props.setAllDone(true);
        }
      }, 1450);
    }
    return () => {
      introAnim.stop();
      outroAnim.stop();
    };
  }, [successProtocol, allActionsFinished]);

  return (
    <Animated.View style={[styles.outerContainer]}>
      <Pressable onPress={onPress}>
        <Animated.View style={styles.innerContainer}>
          {animatedIcons.map(animatedIcon => (
            <AnimatedIcon
              key={animatedIcon.name}
              animatedIconObject={animatedIcon}
              successProtocol={successProtocol}
              allActionsFinished={allActionsFinished}
            />
          ))}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default SuccessProtocol;
