import {FirebaseAuthTypes} from '@react-native-firebase/auth';
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
  const trimmedPassword = password.trim();
  const trimmedRePassword = rePassword.trim();

  if (!trimmedPassword) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste ange ett nytt lösenord!',
      type: 'danger',
    });
    return;
  }
  if (!trimmedRePassword) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste repetera ditt lösenord!',
      type: 'danger',
    });
    return;
  }
  if (trimmedRePassword !== trimmedPassword) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord matchar inte!',
      type: 'danger',
      duration: 3200,
    });
    return;
  }

  if (trimmedRePassword === trimmedPassword) {
    try {
      await user?.updatePassword(trimmedPassword);
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
