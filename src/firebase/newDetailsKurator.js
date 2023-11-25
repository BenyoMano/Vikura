import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

const newDetailsKurator = async ({
  navigation,
  password,
  rePassword,
  setSubmitted,
  setLoading,
}) => {
  const user = auth().currentUser;
  const userId = user.uid;

  if (!password) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste ange ett nytt lösenord!',
      type: 'danger',
    });
    return;
  }
  if (!rePassword) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste repetera ditt lösenord!',
      type: 'danger',
    });
    return;
  }
  if (rePassword !== password) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord matchar inte!',
      type: 'danger',
      duration: 3200,
    });
    return;
  }

  if (rePassword === password) {
    try {
      await Promise.all([
        user.updatePassword(password),
        firestore().collection('Users').doc(userId).update({
          firstLogin: false,
        }),
      ]);

      setLoading(false);
      setSubmitted(false);
      navigation.navigate('KuratorScreen');
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  }
};

export default newDetailsKurator;
