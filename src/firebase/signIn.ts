import auth from '@react-native-firebase/auth';
import navigateAfterSignIn from './navigateAfterSignIn';
import {showMessage} from 'react-native-flash-message';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';
import firestore from '@react-native-firebase/firestore';
import { requestPushPermission } from './requestPushPermission';
import messaging from '@react-native-firebase/messaging';


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
      const { user } = await auth().signInWithEmailAndPassword(
        loginDetails.mail,
        loginDetails.password,
      );

      // Ask user for permission to send push.
      await requestPushPermission();

      // Store device token in Firestore
      const token = await messaging().getToken();
        firestore().collection('Users').doc(user.uid).update({
          deviceToken: token
        });

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
