import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import createRoom from '../../firebase/UserManagement/createRoom';
import createUser from '../../firebase/UserManagement/createUser';
import {
  useDynamicAddUserErrorHandling,
  useGeneralErrorHandling,
} from '../../ErrorHandling/errorHandling';
import addPersonalDetails from '../../firebase/UserManagement/addPersonalDetails';

const addUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  checkboxStateAdmin,
  setSubmitted,
  setSuccessProtocol,
  setActionStates,
}) => {
  userPropToAdd.trimmedFirstName = userPropToAdd.firstName.trim();
  userPropToAdd.trimmedSecondName = userPropToAdd.secondName.trim();
  userPropToAdd.trimmedMejl = userPropToAdd.mejl.trim();
  userPropToAdd.trimmedPassword = userPropToAdd.password.trim();
  userPropToAdd.trimmedPersonnummer = userPropToAdd.personnummer.trim();
  let user;
  let userId;

  if (!userPropToAdd.trimmedFirstName) {
    showMessage({
      message: 'Varning!',
      description: 'Namn saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedSecondName) {
    showMessage({
      message: 'Varning!',
      description: 'Efternamn saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedMejl) {
    showMessage({
      message: 'Varning!',
      description: 'Mejl saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedPassword) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedPersonnummer) {
    showMessage({
      message: 'Varning!',
      description: 'Personnummer saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (userPropToAdd.trimmedPersonnummer.length !== 12) {
    showMessage({
      message: 'Varning!',
      description:
        'Personnummret måste innehålla 12 siffror, utan bindestreck!',
      type: 'danger',
      duration: 3500,
    });
    return;
  }

  if (
    userPropToAdd.trimmedFirstName &&
    userPropToAdd.trimmedSecondName &&
    userPropToAdd.trimmedMejl &&
    userPropToAdd.trimmedPassword &&
    userPropToAdd.trimmedPersonnummer
  ) {
    async function createNewUser() {
      setSuccessProtocol(true);
      try {
        try {
          await createUser({userPropToAdd});
          user = auth().currentUser;
          userId = auth().currentUser.uid;
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
          let subject = 'skapa användare';
          useDynamicAddUserErrorHandling({error, subject, userId});
          return;
        }

        try {
          await addPersonalDetails({
            user,
            userPropToAdd,
            checkboxStateAdmin,
            checkboxStateKurator,
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
          let subject = 'lägga till användaruppgifter';
          useDynamicAddUserErrorHandling({error, subject, userId});
          return;
        }
        try {
          await createRoom({userId});
          setActionStates(prev => ({
            ...prev,
            action3: {
              ...prev.action3,
              status: 'success',
            },
          }));
        } catch (error) {
          setActionStates(prev => ({
            ...prev,
            action3: {
              ...prev.action3,
              status: 'failed',
            },
          }));
          let subject = 'skapa chatt-rum';
          useDynamicAddUserErrorHandling({error, subject, userId});
          return;
        }
        try {
          await auth().signOut();
          setActionStates(prev => ({
            ...prev,
            action4: {
              ...prev.action4,
              status: 'success',
            },
          }));
        } catch (error) {
          setActionStates(prev => ({
            ...prev,
            action4: {
              ...prev.action4,
              status: 'failed',
            },
          }));
          let subject = 'logga ut användaren';
          useDynamicAddUserErrorHandling({error, subject, userId});
          return;
        }

        setTimeout(() => {
          setActionStates(prev => ({
            ...prev,
            action1: {
              ...prev.action1,
              status: 'initial',
            },
            action2: {
              ...prev.action2,
              status: 'initial',
            },
            action3: {
              ...prev.action3,
              status: 'initial',
            },
            action4: {
              ...prev.action4,
              status: 'initial',
            },
          }));
        }, 2000);

        setUserPropToAdd({
          firstName: '',
          secondName: '',
          mejl: '',
          password: '',
          personnummer: '',
          kurator: '',
        });

        showMessage({
          message: 'Kontot skapades framgångsrikt!',
          type: 'success',
          icon: 'success',
          duration: 3000,
        });

        setSubmitted(false);
      } catch (error) {
        useGeneralErrorHandling({error, position: 'top'});
        setSubmitted(false);
      }
    }

    createNewUser();
  }
};
export default addUser;
