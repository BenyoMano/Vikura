import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HeaderView} from '../../../Header/HeaderView';
import MainText from '../../../../atoms/MainText';
import {StackParamList} from '../../../../../App';
import {RouteProp} from '@react-navigation/native';
import ConfirmButton from './ConfirmButton';
import {updateAlias} from '../../../../firebase/UserManagement/ChangeAliasPassword/updateAlias';
import auth from '@react-native-firebase/auth';
import {useAlias} from '../../../../firebase/UserManagement/ChangeAliasPassword/useAlias';
import {updatePassword} from '../../../../firebase/UserManagement/ChangeAliasPassword/updatePassword';

type ChangeAliasScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ChangeAliasPasswordScreen'
>;

type ChangeAliasRouteProp = RouteProp<
  StackParamList,
  'ChangeAliasPasswordScreen'
>;

type ChangeAliasScreenProps = {
  navigation: ChangeAliasScreenNavigationProp;
  route: ChangeAliasRouteProp;
};

const ChangeAliasPasswordScreen: React.FC<ChangeAliasScreenProps> = ({
  navigation,
}) => {
  const [newAlias, setNewAlias] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [animatedValue1, setAnimatedValue1] = useState(new Animated.Value(0));
  const user = auth().currentUser;
  const clientUserId = user?.uid;
  const alias = useAlias({clientUserId});

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

  const handleAlias = async () => {
    await updateAlias({newAlias, clientUserId});
    setNewAlias('');
  };

  const handlePassword = async () => {
    await updatePassword({user, password, rePassword});
    setPassword('');
    setRePassword('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            title="Ändra Alias & Lösenord"
            style={{
              fontSize: 22,
              color: 'black',
            }}
          />
        </Animated.View>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <MainText title="Alias" style={{fontSize: 18, color: 'black'}} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 16,
                  color: 'black',
                }}>
                Nuvarande alias:
              </Text>
              <View style={{paddingLeft: 20}}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans-Italic',
                    fontSize: 16,
                  }}>
                  {alias}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'black',
                width: '100%',
                marginBottom: 10,
              }}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={newAlias => setNewAlias(newAlias)}
                value={newAlias}
                autoFocus={false}
                placeholder="Nytt alias"
                placeholderTextColor="#4F4F4F"
                multiline={false}
                textBreakStrategy="simple"
                underlineColorAndroid="transparent"
                pointerEvents="none"
              />
            </View>
            <ConfirmButton title="Ändra Alias" onPress={handleAlias} />
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'black',
                width: '100%',
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <MainText title="Lösenord" style={{fontSize: 18, color: 'black'}} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans-Regular',
                  fontSize: 16,
                  color: 'black',
                }}>
                Skriv in ditt nya lösenord:
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry
                style={styles.inputStyle}
                onChangeText={password => setPassword(password)}
                value={password}
                autoFocus={false}
                placeholder="Nytt lösenord"
                placeholderTextColor="#4F4F4F"
                multiline={false}
                textBreakStrategy="simple"
                underlineColorAndroid="transparent"
                pointerEvents="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry
                style={styles.inputStyle}
                onChangeText={rePassword => setRePassword(rePassword)}
                value={rePassword}
                autoFocus={false}
                placeholder="Bekräfta lösenord"
                placeholderTextColor="#4F4F4F"
                multiline={false}
                textBreakStrategy="simple"
                underlineColorAndroid="transparent"
                pointerEvents="none"
              />
            </View>
            <ConfirmButton title="Ändra lösenord" onPress={handlePassword} />
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 20,
  } as ViewStyle,
  scrollContainer: {
    // flex: 1,
    // justifyContent: 'space-around',
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
  inputContainer: {
    // flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  } as ViewStyle,
  inputStyle: {
    width: '100%',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
  } as TextStyle,
});

export default ChangeAliasPasswordScreen;
