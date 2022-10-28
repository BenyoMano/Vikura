import firestore from '@react-native-firebase/firestore';

async function renewDetails() {
  if (rePassword === password) {
    await auth()
      .currentUser.updatePassword(newDetails.password)
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
  } else {
    console.log('Lösenordet matchar inte!');
  }

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
        });
    });
}
