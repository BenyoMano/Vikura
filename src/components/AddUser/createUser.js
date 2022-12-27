import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const createUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxState,
  setCheckboxState,
}) => {

  if (!userPropToAdd.firstName) {
    showMessage({
      message: "Varning!",
      description: "Namn saknas!",
      type: "warning",
      position: "center",
      floating: true,
      duration: 2500
    });
  }
  if (!userPropToAdd.secondName) {
    showMessage({
      message: "Varning!",
      description: "Efternamn saknas!",
      type: "warning",
      position: "center",
      floating: true,
      duration: 2500
    });
  }
  if (!userPropToAdd.mejl) {
    showMessage({
      message: "Varning!",
      description: "Mejl saknas!",
      type: "warning",
      position: "center",
      floating: true,
      duration: 2500
    });
  }
  if (!userPropToAdd.password) {
    showMessage({
      message: "Varning!",
      description: "Lösenord saknas!",
      type: "warning",
      position: "center",
      floating: true,
      duration: 2500
    });
  }
  if (!userPropToAdd.personnummer) {
    showMessage({
      message: "Varning!",
      description: "Personnummer saknas!",
      type: "warning",
      position: "default",
      floating: true,
      duration: 2500
    });
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
      const userAlias = checkboxState === true ? 'KURATOR' : '';
      await refUID.set({
        firstName: userPropToAdd.firstName,
        secondName: userPropToAdd.secondName,
        mejl: userPropToAdd.mejl,
        personNummer: userPropToAdd.personnummer,
        alias: userAlias,
        firstLogin: userPropToAdd.firstLogin,
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
          console.log('User account created & signed in!');
          console.log('Förnamn:', userPropToAdd.firstName);
          console.log('Efternamn:', userPropToAdd.secondName);
          console.log('Mejl', userPropToAdd.mejl);
          console.log('Lösenord', userPropToAdd.password);
          console.log('Personnummer', userPropToAdd.personnummer);
          console.log('[first login]', userPropToAdd.firstLogin);
          console.log('Kurator?:', checkboxState);
          console.log('UID:', user.uid);

          addPersonalDetails(user).then(() =>
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
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
    }

    createNewUser();
    setUserPropToAdd({
      firstName: '',
      secondName: '',
      mejl: '',
      password: '',
      personnummer: '',
      kurator: '',
    });
  };
};

export default createUser;
