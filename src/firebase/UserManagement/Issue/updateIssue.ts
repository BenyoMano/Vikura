import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';

type UpdateIssueProps = {
  docId: string;
};

export const updateIssue = ({docId}: UpdateIssueProps) => {
  const setIssue = async () => {
    try {
      await firestore().collection('issues').doc(docId).update({
        fixed: true,
      });
      showMessage({
        message: 'Uppdaterades!',
        type: 'success',
        icon: 'success',
        duration: 4000,
        position: 'center',
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
  setIssue();
};
