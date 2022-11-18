import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const createUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxState,
  setCheckboxState,
}) => {
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

export default createUser;
