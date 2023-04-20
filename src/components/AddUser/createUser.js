import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const createUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxState,
  setSubmitted,
  setHasAddedUser,
}) => {
  if (!userPropToAdd.firstName) {
    showMessage({
      message: 'Varning!',
      description: 'Namn saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.secondName) {
    showMessage({
      message: 'Varning!',
      description: 'Efternamn saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.mejl) {
    showMessage({
      message: 'Varning!',
      description: 'Mejl saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.password) {
    showMessage({
      message: 'Varning!',
      description: 'Lösenord saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.personnummer) {
    showMessage({
      message: 'Varning!',
      description: 'Personnummer saknas!',
      type: 'danger',
      duration: 2500,
    });
    return;
  }
  if (userPropToAdd.personnummer.length !== 12) {
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
    userPropToAdd.firstName &&
    userPropToAdd.secondName &&
    userPropToAdd.mejl &&
    userPropToAdd.password &&
    userPropToAdd.personnummer
  ) {
    const addPersonalDetails = async user => {
      const refUID = firestore().collection('Users').doc(user.uid);
      const userAlias = checkboxState ? 'KURATOR' : '';
      await refUID.set({
        firstName: userPropToAdd.firstName,
        secondName: userPropToAdd.secondName,
        mejl: userPropToAdd.mejl,
        personNummer: userPropToAdd.personnummer,
        alias: userAlias,
        firstLogin: true,
        kurator: checkboxState,
      });
    };

    async function createNewUser() {
      await auth()
        .createUserWithEmailAndPassword(
          userPropToAdd.mejl,
          userPropToAdd.password,
        )
        .then(() => {
          const user = auth().currentUser;

          addPersonalDetails(user).then(() =>
            auth()
              .signOut()
              .then(() => {
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
              }),
          );
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email adress is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email adress is invalid!');
          }
          console.error(error);
        });
        setSubmitted(false);
    }

    createNewUser();
  }
};

export default createUser;
