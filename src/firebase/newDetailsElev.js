import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const newDetailsElev = async ({password, rePassword, alias}) => {
  if (rePassword === password) {
    await auth()
      .currentUser.updatePassword(password)
      .then(() => {
        console.log('Password updated');
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          console.log('Weak password');
        }
        if (error.code === 'auth/requires-recent-login') {
          console.log('You have to reauthenticate');
        }
        console.error(error);
      });

    await auth()
      .currentUser.updateProfile({
        displayName: alias,
      })
      .then(() => {
        console.log('Nytt nickname', alias);
      });

    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();
        console.log('Current Data:', currentData);
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            ...currentData,
            firstLogin: false,
            alias: alias,
          });
      });
  } else {
    console.log('Lösenordet matchar inte!');
  }
};

export default newDetailsElev;