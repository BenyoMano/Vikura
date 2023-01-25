import auth from '@react-native-firebase/auth';

const signOut = () => {
  
  const user = auth().currentUser;
  if (user) {
    auth()
    .signOut()
  }
};

export default signOut;
