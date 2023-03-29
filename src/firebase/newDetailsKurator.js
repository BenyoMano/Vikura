import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const newDetailsKurator = async ({password, rePassword}) => {
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
        showMessage({
          message: "Varning!",
          description: String(error),
          type: "warning",
          position: "default",
          duration: 3200,
          hideStatusBar: Platform.OS === 'ios' ? true : false,
        });
      });

    firestore()
      .collection('Users')
      .doc(auth().currentUser.id)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();
        console.log('Current Data:', currentData);
        firestore()
          .collection('Users')
          .doc(auth().currentUser.id)
          .set({
            ...currentData,
            firstLogin: false,
          });
      });
  } else {
    showMessage({
      message: "Varning!",
      description: "Lösenord matchar inte!",
      type: "warning",
      position: "default",
      duration: 3200,
      hideStatusBar: Platform.OS === 'ios' ? true : false,
    });
    console.log('Lösenordet matchar inte!');
  }
};
export default newDetailsKurator;
