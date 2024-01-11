import {showMessage} from 'react-native-flash-message';
import {HCSettingsChoice} from '../../../components/UserSettings/Screens/Helpcenter/HelpcenterScreen';
import firestore from '@react-native-firebase/firestore';

type reportProblemProps = {
  settingsChoice: HCSettingsChoice;
  messageToSend: string;
  setMessageToSend: React.Dispatch<React.SetStateAction<string>>;
  userDetails: any;
  clientUserId: string | undefined;
};

export const reportProblem = ({
  settingsChoice,
  messageToSend,
  setMessageToSend,
  clientUserId,
  userDetails,
}: reportProblemProps) => {
  const addIssue = async () => {
    try {
      const timestamp = new Date();
      await firestore().collection('problems').add({
        id: clientUserId,
        mail: userDetails.mail,
        issue: messageToSend,
        category: settingsChoice,
        timestamp: timestamp,
      });
      setMessageToSend('');
      showMessage({
        message: 'Tack!',
        description:
          settingsChoice === 'problem'
            ? 'Vi försöker lösa problemet så snabbt vi kan.'
            : 'Vi uppskattar din feedback!',
        type: 'info',
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
  addIssue();
};
