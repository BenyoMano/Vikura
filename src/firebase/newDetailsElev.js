import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import updateRoomAlias from './updateRoomAlias';

const newDetailsElev = async ({
  navigation,
  password,
  rePassword,
  alias,
  setSubmitted,
  setLoading,
}) => {
  const user = auth().currentUser;
  const userId = auth().currentUser.uid;

  if (!password) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste ange ett nytt lösenord!',
      type: 'danger',
    });
  }
  if (!rePassword) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste repetera ditt lösenord!',
      type: 'danger',
    });
    return;
  }
  if (!alias) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste ange ett nickname!',
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
        user.updateProfile({
          displayName: alias,
        }),
        firestore().collection('Users').doc(userId).update({
          firstLogin: false,
          alias: alias,
        }),
        user.updatePassword(password),
        updateRoomAlias({alias, userId}),
      ]);

      showMessage({
        message: 'Välkommen!',
        description: 'Du kan börja chatta direkt!',
        type: 'info',
        position: 'center',
        floating: true,
        duration: 3000,
      });

      setLoading(false);
      setSubmitted(false);
      navigation.navigate('ChatScreen', {id: userId});
    } catch (error) {
      showMessage({
        message: 'Varning!',
        description: String(error),
        type: 'danger',
        duration: 3200,
      });
      console.error(error);
      setLoading(false);
    }
  }
};

export default newDetailsElev;
