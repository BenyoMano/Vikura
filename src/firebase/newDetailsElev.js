import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const newDetailsElev = async ({navigation, password, rePassword, alias}) => {
  const user = auth().currentUser;

  if (rePassword === password) {
    await auth()
      .currentUser.updatePassword(password)
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          console.log('Weak password');
        }
        if (error.code === 'auth/requires-recent-login') {
          console.log('You have to reauthenticate');
        }
        console.error(error);
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
      });

    await auth().currentUser.updateProfile({
      displayName: alias,
    });

    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();

        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            ...currentData,
            firstLogin: false,
            alias: alias,
          });
      });
    navigation.navigate('ChatView', {id: user.uid});
  } else {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord matchar inte!',
      type: 'danger',
      duration: 3200,
    });
    console.log('Lösenordet matchar inte!');
  }
};

export default newDetailsElev;
