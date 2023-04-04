import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const navigateAfterSignIn = async ({navigation}) => {
  const user = auth().currentUser;
  console.log('navigateAfterSignIn - user', user);
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
