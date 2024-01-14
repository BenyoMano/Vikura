import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type requestDeleteProps = {
  userDetails: any;
  clientUserId: string | undefined;
  setHasRequested: React.Dispatch<React.SetStateAction<boolean>>;
};

export const requestDelete = ({
  clientUserId,
  userDetails,
  setHasRequested,
}: requestDeleteProps) => {
  const user = auth().currentUser;

  const addRequest = async () => {
    try {
      try {
        const timestamp = new Date();
        await firestore().collection('delete-requests').doc(clientUserId).set({
          id: clientUserId,
          alias: userDetails.alias,
          deleted: false,
          timestamp: timestamp,
        });
      } catch {
        showMessage({
          message: 'Misslyckades!',
          description: 'Kunde inte skapa notis: ',
          type: 'danger',
          icon: 'danger',
          autoHide: false,
          floating: true,
        });
        return;
      }
      try {
        await user?.delete();
      } catch (error) {
        showMessage({
          message: 'Misslyckades!',
          description: String(error.message),
          type: 'danger',
          icon: 'danger',
          autoHide: false,
          floating: true,
        });
        return;
      }
      setHasRequested(true);
      showMessage({
        message: 'Begäran Lyckades!',
        description:
          'Tråkigt att du lämnar oss. Tack för din tid! \n Du har nu loggats ut.',
        type: 'success',
        icon: 'success',
        duration: 5000,
        position: 'top',
      });
    } catch (error) {
      showMessage({
        message: 'Misslyckades!',
        description: String(error.message),
        type: 'danger',
        icon: 'danger',
        autoHide: false,
        floating: true,
      });
    }
  };
  addRequest();
};
