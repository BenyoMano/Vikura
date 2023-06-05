import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { firebase } from '@react-native-firebase/app';

firebase.setLogLevel('debug');

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
      message: "Varning!",
      description: "Namn saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedSecondName) {
    showMessage({
      message: "Varning!",
      description: "Efternamn saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedMejl) {
    showMessage({
      message: "Varning!",
      description: "Mejl saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedPassword) {
    showMessage({
      message: "Varning!",
      description: "Lösenord saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.trimmedPersonnummer) {
    showMessage({
      message: "Varning!",
      description: "Personnummer saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (userPropToAdd.trimmedPersonnummer.length !== 12) {
    showMessage({
      message: "Varning!",
      description:
        "Personnummret måste innehålla 12 siffror, utan bindestreck!",
      type: "danger",
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
    const addPersonalDetails = async (user) => {
      const refUID = firestore().collection("Users").doc(user.uid);
      const userAlias = checkboxStateKurator ? "KURATOR" : "";
      await refUID.set({
        firstName: userPropToAdd.trimmedFirstName,
        secondName: userPropToAdd.trimmedSecondName,
        mejl: userPropToAdd.trimmedMejl,
        personNummer: userPropToAdd.trimmedPersonnummer,
        alias: userAlias,
        firstLogin: true,
        kurator: checkboxStateKurator,
        admin: checkboxStateAdmin,
      });
    };

    async function createNewUser() {
      try {
        await auth().createUserWithEmailAndPassword(
          userPropToAdd.trimmedMejl,
          userPropToAdd.trimmedPassword
        );
        console.log('After "createUser"')
        const user = auth().currentUser;
        console.log('After "auth()currentUser"')
        
        await addPersonalDetails(user);
        console.log('After "addPersinalDetails"')

        try {
          await auth().signOut();
          console.log('Success!');
          console.log('User:', auth.currentUser);

        } catch {
          console.log('Failed');
        }

        setUserPropToAdd({
          firstName: "",
          secondName: "",
          mejl: "",
          password: "",
          personnummer: "",
          kurator: "",
        });

        setHasAddedUser(true);

        showMessage({
          message: "Kontot skapades framgångsrikt!",
          type: "success",
          duration: 2000,
        });
      } catch (error) {
        console.error(error);
        console.error(error.stack);
        showMessage({
          message: "Misslyckades!",
          description: String(error),
          type: "danger",
          duration: 5000,
        });
        setSubmitted(false);
      }
    }
    createNewUser();
  }
};
export default createUser;
