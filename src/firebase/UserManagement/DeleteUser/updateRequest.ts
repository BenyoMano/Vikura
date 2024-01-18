import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';

type UpdateRequestProps = {
  clientUserId: string | undefined;
};

export const updateReqeust = ({clientUserId}: UpdateRequestProps) => {
  const setRequest = async () => {
    try {
      await firestore().collection('delete-requests').doc(clientUserId).update({
        deleted: true,
      });
    } catch (error) {
      showMessage({
        message: 'Ojdå! Något gick fel :(',
        description: String(error.message),
        type: 'danger',
        autoHide: false,
        position: 'top',
        floating: true,
        icon: 'danger',
      });
    }
  };
  setRequest();
};
