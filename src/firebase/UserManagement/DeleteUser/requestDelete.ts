import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';

type requestDeleteProps = {
  userDetails: any;
  clientUserId: string | undefined;
};

export const requestDelete = ({
  clientUserId,
  userDetails,
}: requestDeleteProps) => {
  const addRequest = async () => {
    try {
      const timestamp = new Date();
      await firestore().collection('delete-requests').doc(clientUserId).set({
        id: clientUserId,
        alias: userDetails.alias,
        deleted: false,
        timestamp: timestamp,
      });
      showMessage({
        message: 'Begäran Lyckades!',
        description: 'Tråkigt att du lämnar oss. Tack för din tid!',
        type: 'success',
        icon: 'success',
        duration: 5000,
        position: 'top',
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
  addRequest();
};
