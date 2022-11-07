import auth from '@react-native-firebase/auth';
import navigateAfterSignIn from './navigate';

const signIn = async ({navigation, loginDetails, setLoginDetails}) => {
  await auth()
    .signInWithEmailAndPassword(loginDetails.mejl, loginDetails.password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email adress is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email adress is invalid!');
      }
      console.error(error);
    });

  navigateAfterSignIn({navigation});

  //Clear TextInput fields
  setLoginDetails({
    mejl: '',
    password: '',
  });
};

export default signIn;
