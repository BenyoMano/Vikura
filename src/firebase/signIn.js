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

    try {
      await auth().signInWithEmailAndPassword(loginDetails.mejl, loginDetails.password);
     
      navigateAfterSignIn({navigation});
      setLoginDetails({
        mejl: '',
        password: '',
      });

      setLoading(false);
      setSubmitted(false);

    } catch (error) {
      showMessage({
        message: 'Varning!',
        description: String(error),
        type: 'danger',
        duration: 3800,
      });
      setLoading(false);
    }
  }
};

export default signIn;
