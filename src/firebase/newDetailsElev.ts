import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import updateRoomAlias from './updateRoomAlias';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

const newDetailsElev = async ({
  password,
  rePassword,
  alias,
  setSubmitted,
  setActionStates,
  setSuccessProtocol,
}) => {
  const user = auth().currentUser;
  const userId = user?.uid;

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
    async function updateUser() {
      setSuccessProtocol(true);
      try {
        try {
          await user?.updatePassword(password);
          setActionStates(prev => ({
            ...prev,
            action1: {
              ...prev.action1,
              status: 'success',
            },
          }));
        } catch (error) {
          setActionStates(prev => ({
            ...prev,
            action1: {
              ...prev.action1,
              status: 'failed',
            },
          }));
          useGeneralErrorHandling({error, position: 'top'});
          return;
        }
        try {
          await updateRoomAlias({alias, userId});
          await firestore().collection('Users').doc(userId).update({
            firstLogin: false,
            alias: alias,
          });
          setActionStates(prev => ({
            ...prev,
            action2: {
              ...prev.action2,
              status: 'success',
            },
          }));
        } catch (error) {
          setActionStates(prev => ({
            ...prev,
            action2: {
              ...prev.action2,
              status: 'failed',
            },
          }));
          useGeneralErrorHandling({error, position: 'top'});
          return;
        }
        setSubmitted(false);
      } catch (error) {
        useGeneralErrorHandling({error, position: 'top'});
      }
    }

    updateUser();
  }
};

export default newDetailsElev;
