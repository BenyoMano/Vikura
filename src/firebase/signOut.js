import auth from '@react-native-firebase/auth';

const signOut = () => {
  
  const user = auth().currentUser;
  console.log('Current User?:', user)
  if (user) {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  } else {
    console.log('No user to sign out!')
  }
};

export default signOut;
