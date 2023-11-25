import auth from '@react-native-firebase/auth';
import navigateAfterSignIn from './navigateAfterSignIn';
import {showMessage} from 'react-native-flash-message';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

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
      await auth().signInWithEmailAndPassword(
        loginDetails.mejl,
        loginDetails.password,
      );

      navigateAfterSignIn({navigation});
      setLoginDetails({
        mejl: '',
        password: '',
      });

      setLoading(false);
      setSubmitted(false);
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
      setLoading(false);
    }
  }
};

export default signIn;
