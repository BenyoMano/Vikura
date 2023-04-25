import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const newDetailsKurator = async ({navigation, password, rePassword, setSubmitted, setLoading}) => {

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

    await auth()
      .currentUser.updatePassword(password)
      .catch(error => {
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
      });

    firestore()
      .collection('Users')
      .doc(auth().currentUser.id)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();
        console.log('Current Data:', currentData);
        firestore()
          .collection('Users')
          .doc(auth().currentUser.id)
          .set({
            ...currentData,
            firstLogin: false,
          });
      });
      navigation.navigate('KuratorView');
      setLoading(false);
      setSubmitted(false);
  };
};
export default newDetailsKurator;
