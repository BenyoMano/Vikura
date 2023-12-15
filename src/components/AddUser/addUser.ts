import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import createRoom from '../../firebase/UserManagement/createRoom';
import createUser from '../../firebase/UserManagement/createUser';
import {
  useDynamicAddUserErrorHandling,
  useGeneralErrorHandling,
} from '../../ErrorHandling/errorHandling';
import addPersonalDetails from '../../firebase/UserManagement/addPersonalDetails';
import {ActionStates, UserPropToAdd} from './AddUserScreen';
import React from 'react';

type AddUserProps = {
  userPropToAdd: UserPropToAdd;
  setUserPropToAdd: React.Dispatch<React.SetStateAction<UserPropToAdd>>;
  checkboxStateKurator: boolean;
  checkboxStateAdmin: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setActionStates: React.Dispatch<React.SetStateAction<ActionStates>>;
  setSuccessProtocol: React.Dispatch<React.SetStateAction<boolean>>;
};

const addUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  checkboxStateAdmin,
  setSubmitted,
  setActionStates,
  setSuccessProtocol,
}: AddUserProps) => {
  userPropToAdd.trimmedFirstName = userPropToAdd.firstName.trim();
  userPropToAdd.trimmedSecondName = userPropToAdd.secondName.trim();
  userPropToAdd.trimmedMejl = userPropToAdd.mejl.trim();
  userPropToAdd.trimmedPassword = userPropToAdd.password.trim();
  userPropToAdd.trimmedPersonnummer = userPropToAdd.personnummer.trim();
  let user: FirebaseAuthTypes.User | null;
  let userId: string | undefined;

  if (!userPropToAdd.trimmedFirstName) {
    showMessage({
      message: 'Varning!',
      description: 'Förnamn saknas!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (!userPropToAdd.trimmedSecondName) {
    showMessage({
      message: 'Varning!',
      description: 'Efternamn saknas!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (!userPropToAdd.trimmedMejl) {
    showMessage({
      message: 'Varning!',
      description: 'Mejl saknas!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (!userPropToAdd.trimmedPassword) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord saknas!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (!userPropToAdd.trimmedPersonnummer) {
    showMessage({
      message: 'Varning!',
      description: 'Personnummer saknas!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (userPropToAdd.trimmedPersonnummer.length !== 12) {
    showMessage({
      message: 'Varning!',
      description:
        'Personnummret måste innehålla 12 siffror, utan bindestreck!',
      type: 'danger',
      autoHide: false,
    });
    return;
  }
  if (checkboxStateAdmin && !checkboxStateKurator) {
    showMessage({
      message: 'Varning!',
      description: 'En "Admin" måste också ha "Utökad behörighet" (Kurator)!',
      type: 'danger',
      autoHide: false,
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
          userId = auth().currentUser?.uid;
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
          firstLogin: true,
          kurator: false,
          admin: false,
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
