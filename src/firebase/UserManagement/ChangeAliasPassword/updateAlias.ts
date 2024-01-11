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
  const userId = clientUserId;
  const alias = newAlias;
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
};
