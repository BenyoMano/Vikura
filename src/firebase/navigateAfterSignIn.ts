import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const navigateAfterSignIn = async ({navigation}) => {
  const user = auth().currentUser;
  const askNavigationConditions = await firestore()
    .collection('Users')
    .doc(user?.uid)
    .get();

  const newUserStatus = askNavigationConditions.get('firstLogin');
  const kuratorStatus = askNavigationConditions.get('kurator');

  if (newUserStatus && !kuratorStatus) {
    navigation.navigate('NewClientScreen');
  }
  if (!newUserStatus && !kuratorStatus) {
    navigation.navigate('ChatScreen', {id: user?.uid});
  }
  if (!newUserStatus && kuratorStatus) {
    navigation.navigate('KuratorScreen');
  }
  if (newUserStatus && kuratorStatus) {
    navigation.navigate('NewKuratorScreen');
  }
};

export default navigateAfterSignIn;
