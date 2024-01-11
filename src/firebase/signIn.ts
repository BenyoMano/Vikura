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
  if (!loginDetails.mail) {
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

  if (loginDetails.mail && loginDetails.password) {
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(
        loginDetails.mail,
        loginDetails.password,
      );

      navigateAfterSignIn({navigation});
      setLoginDetails({
        mail: '',
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
