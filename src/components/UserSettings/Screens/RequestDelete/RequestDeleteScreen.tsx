import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle, Animated, Easing} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../../../Header/HeaderView';
import MainText from '../../../../atoms/MainText';
import {StackParamList} from '../../../../../App';
import {RouteProp} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import RequestDeleteButton from './RequestDeleteButton';

type RequestDeleteScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'RequestDeleteScreen'
>;

type RequestDeleteRouteProp = RouteProp<StackParamList, 'RequestDeleteScreen'>;

type RequestDeleteScreenProps = {
  navigation: RequestDeleteScreenNavigationProp;
  route: RequestDeleteRouteProp;
};

const RequestDeleteScreen: React.FC<RequestDeleteScreenProps> = ({
  navigation,
}) => {
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));

  const fadeInAnim = Animated.timing(animatedValue1, {
    toValue: 1,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const fadeInterpolate = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    fadeInAnim.start(() => {});

    return () => {
      fadeInAnim.stop();
      animatedValue1.setValue(0);
    };
  }, []);

  return (
    <View style={[styles.screenContainer, {flexDirection: 'column'}]}>
      <HeaderView navigation={navigation} />
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeInterpolate,
          },
        ]}>
        <MainText
          title={'Begär radering av kontot'}
          style={{
            fontSize: 24,
            color: 'black',
          }}
        />
      </Animated.View>
      <View style={styles.mainContainer}>
        <Icon
          name="delete-forever"
          type="material-icons"
          color="red"
          size={40}
        />
        <MainText
          title="En begäran om radering av kontot kommer att skickas till admin."
          style={{
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            marginTop: -30,
          }}
        />
        <MainText
          title="Raderingen inkluderar själva kontot, konversationer och personliga uppgifter kopplade till dig."
          style={{fontSize: 20, color: 'black', textAlign: 'center'}}
        />
        <MainText
          title="Denna handling är permanent och kan inte ångras när väl kontot är raderat."
          style={{fontSize: 20, color: 'red', textAlign: 'center'}}
        />
        <RequestDeleteButton title="Skicka Begäran" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  mainContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  } as ViewStyle,
});

export default RequestDeleteScreen;
