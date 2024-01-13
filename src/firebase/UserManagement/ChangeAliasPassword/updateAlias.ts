import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import updateRoomAlias from '../../updateRoomAlias';
import {useGeneralErrorHandling} from '../../../ErrorHandling/errorHandling';
import {showMessage} from 'react-native-flash-message';

type UpdateAliasProps = {
  newAlias: string;
  clientUserId: string | undefined;
};

export const updateAlias = async ({
  newAlias,
  clientUserId,
}: UpdateAliasProps) => {
  const trimmedNewAlias = newAlias.trim();
  if (!trimmedNewAlias) {
    showMessage({
      message: 'Varning!',
      description: 'Du måste ange ett alias',
      type: 'danger',
    });
  }
  if (trimmedNewAlias) {
    const userId = clientUserId;
    const alias = trimmedNewAlias;
    try {
      await updateRoomAlias({alias, userId});
      await firestore().collection('Users').doc(userId).update({
        alias: alias,
      });
      showMessage({
        message: 'Lyckades!',
        description: 'Du bytte alias.',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  }
};
