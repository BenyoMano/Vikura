import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import updateRoomAlias from '../../updateRoomAlias';
import {useGeneralErrorHandling} from '../../../ErrorHandling/errorHandling';
import {showMessage} from 'react-native-flash-message';

type UpdatePasswordProps = {
  user: FirebaseAuthTypes.User | null;
  password: string;
  rePassword: string;
};

export const updatePassword = async ({
  user,
  password,
  rePassword,
}: UpdatePasswordProps) => {
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
      await user?.updatePassword(password);
      showMessage({
        message: 'Lyckades!',
        description: 'Du bytte lösenord.',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  }
};
