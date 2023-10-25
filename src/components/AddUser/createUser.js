import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import signOut from '../../firebase/signOut';
import createRoom from '../../firebase/createRoom';

const createUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  checkboxStateAdmin,
  setSubmitted,
  setHasAddedUser,
}) => {
  userPropToAdd.trimmedFirstName = userPropToAdd.firstName.trim();
  userPropToAdd.trimmedSecondName = userPropToAdd.secondName.trim();
  userPropToAdd.trimmedMejl = userPropToAdd.mejl.trim();
  userPropToAdd.trimmedPassword = userPropToAdd.password.trim();
  userPropToAdd.trimmedPersonnummer = userPropToAdd.personnummer.trim();

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
    const addPersonalDetails = async user => {
      const refUID = firestore().collection('Users').doc(user.uid);
      console.log('After refUID');
      await refUID.set({
        firstName: userPropToAdd.trimmedFirstName,
        secondName: userPropToAdd.trimmedSecondName,
        mejl: userPropToAdd.trimmedMejl,
        personNummer: userPropToAdd.trimmedPersonnummer,
        alias: '',
        firstLogin: true,
        kurator: checkboxStateKurator,
        admin: checkboxStateAdmin,
      });
      console.log('After refUID.set()');
    };

    async function createNewUser() {
      try {
        await auth().createUserWithEmailAndPassword(
          userPropToAdd.trimmedMejl,
          userPropToAdd.trimmedPassword,
        );
        console.log('After "createUser"');
        const user = auth().currentUser;
        const userId = auth().currentUser.uid;

        await addPersonalDetails(user);
        console.log('After "addPersinalDetails"');

        createRoom({userId});

        try {
          await auth().signOut();
          console.log('After signOut');
        } catch {
          console.log('Failed signing out!');
        }

        setUserPropToAdd({
          firstName: '',
          secondName: '',
          mejl: '',
          password: '',
          personnummer: '',
          kurator: '',
        });

        setHasAddedUser(true);

        showMessage({
          message: 'Kontot skapades framgångsrikt!',
          type: 'success',
          duration: 2000,
        });
      } catch (error) {
        console.error('createUser Error: ', error);
        showMessage({
          message: 'Misslyckades!',
          description: String(error),
          type: 'danger',
          duration: 5000,
        });
        setSubmitted(false);
      }
    }
    if (auth().currentUser) {
      async () => {
        await auth().signOut();
      };
      setTimeout(() => {
        createNewUser();
      }, 3000);
    } else {
      createNewUser();
    }
  }
};
export default createUser;
