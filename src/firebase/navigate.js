import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const navigateAfterSignIn = async ({navigation}) => {
  const user = auth().currentUser;
  firestore()
    .collection('Users')
    .doc(user.uid)
    .onSnapshot(querySnapshot => {
      const newUserStatus = querySnapshot.get('firstLogin');
      const kuratorStatus = querySnapshot.get('kurator');
      console.log('User status', newUserStatus);
      if (newUserStatus === true && kuratorStatus == !true) {
        navigation.navigate('NewElev');
      }
      if (newUserStatus === false && kuratorStatus == !true) {
        navigation.navigate('ChatView', {id: user.uid});
      }
      if (newUserStatus === false && kuratorStatus == true) {
        navigation.navigate('Kurator');
      }
      if (newUserStatus === true && kuratorStatus == true) {
        navigation.navigate('NewKurator');
      }
    });
};

export default navigateAfterSignIn;
