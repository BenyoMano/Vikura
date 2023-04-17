import auth from '@react-native-firebase/auth';
import navigateAfterSignIn from './navigateAfterSignIn';
import {showMessage} from 'react-native-flash-message';

const signIn = async ({
  navigation,
  loginDetails,
  setLoginDetails,
  setLoading,
  setSubmitted,
}) => {
  if (!loginDetails.mejl) {
    showMessage({
      message: 'Varning!',
      description: 'Mejl saknas!',
      type: 'danger',
    });
  }
  if (!loginDetails.password) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord saknas!',
      type: 'danger',
    });
  }

  if (loginDetails.mejl && loginDetails.password) {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(loginDetails.mejl, loginDetails.password)
      .then(() => {
        navigateAfterSignIn({navigation});
        setLoginDetails({
          mejl: '',
          password: '',
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email adress is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email adress is invalid!');
        }
        console.error(error);
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3800,
        });
      });

    setLoading(false);
    setSubmitted(false);
  }
};

export default signIn;
