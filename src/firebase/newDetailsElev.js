import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const newDetailsElev = async ({navigation, password, rePassword, alias, setSubmitted, setLoading}) => {
  const user = auth().currentUser;

  if (!password) {
    showMessage({
      message: 'Varning!',
      description: "Du måste ange ett nytt lösenord!",
      type: 'danger',
    });
  }
  if (!rePassword) {
    showMessage({
      message: 'Varning!',
      description: "Du måste repetera ditt lösenord!",
      type: 'danger',
    });
    return;
  }
  if (!alias) {
    showMessage({
      message: 'Varning!',
      description: "Du måste ange ett nickname!",
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

    await auth().currentUser.updateProfile({
      displayName: alias,
    });

    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const currentData = querySnapshot.data();
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            ...currentData,
            firstLogin: false,
            alias: alias,
          });
      });
    navigation.navigate('ChatView', {id: user.uid});
    setLoading(false);
    setSubmitted(false);
  };
};

export default newDetailsElev;
