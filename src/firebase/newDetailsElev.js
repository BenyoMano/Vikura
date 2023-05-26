import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import createRoom from './createRoom';

const newDetailsElev = async ({navigation, password, rePassword, alias, setSubmitted, setLoading}) => {
  const user = auth().currentUser;
  const userId = user.uid;

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

    try {
      await Promise.all([
        await auth().currentUser.updatePassword(password),
        await auth().currentUser.updateProfile({
          displayName: alias,
        }),   
        await firestore().collection('Users').doc(userId).update({
          firstLogin: false,
          alias: alias,
        }),
      ]);
        
      createRoom({userId});
      navigation.navigate('ChatScreen', {id: userId});
      setLoading(false);
      setSubmitted(false);

    } catch (error) {
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
    }
  };
};

export default newDetailsElev;
