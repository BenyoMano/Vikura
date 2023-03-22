import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsKurator} from './isKuratorContext';
import {useEffect} from 'react';

const navigateAfterSignIn = async ({navigation}) => {
  
  const user = auth().currentUser;

 
  const askNavigationConditions = await firestore()
    .collection('Users')
    .doc(user.uid)
    .get();

  const newUserStatus = askNavigationConditions.get('firstLogin');
  const kuratorStatus = askNavigationConditions.get('kurator');

  if (newUserStatus && !kuratorStatus) {
    navigation.navigate('NewElev');
  }
  if (!newUserStatus && !kuratorStatus) {
    navigation.navigate('ChatView', {id: user.uid});
  }
  if (!newUserStatus && kuratorStatus) {
    navigation.navigate('KuratorView');
  }
  if (newUserStatus && kuratorStatus) {
    navigation.navigate('NewKurator');
  }
};

export default navigateAfterSignIn;
