import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const newDetailsKurator = async ({navigation, password, rePassword, setSubmitted, setLoading}) => {
  const user = auth().currentUser;
  const userId = user.uid;


  if (!password) {
    showMessage({
      message: 'Varning!',
      description: "Du måste ange ett nytt lösenord!",
      type: 'danger',
    });
    return;
  }
  if (!rePassword) {
    showMessage({
      message: 'Varning!',
      description: "Du måste repetera ditt lösenord!",
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
    setLoading(true);

    try {
      await Promise.all([
        await user.updatePassword(password),
        await firestore().collection('Users').doc(userId).update({
          firstLogin: false,
        }),
      ]);

      navigation.navigate('KuratorScreen');
      setLoading(false);
      setSubmitted(false);

    } catch (error) {
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
        setLoading(false);
    }
  };
};

export default newDetailsKurator;
