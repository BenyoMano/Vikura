import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";

const createUser = ({
  userPropToAdd,
  setUserPropToAdd,
  checkboxStateKurator,
  checkboxStateAdmin,
  setSubmitted,
  setHasAddedUser,
}) => {
  userPropToAdd.firstName = userPropToAdd.firstName.trim();
  userPropToAdd.secondName = userPropToAdd.secondName.trim();
  userPropToAdd.mejl = userPropToAdd.mejl.trim();
  userPropToAdd.password = userPropToAdd.password.trim();
  userPropToAdd.personnummer = userPropToAdd.personnummer.trim();

  if (!userPropToAdd.firstName) {
    showMessage({
      message: "Varning!",
      description: "Namn saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.secondName) {
    showMessage({
      message: "Varning!",
      description: "Efternamn saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.mejl) {
    showMessage({
      message: "Varning!",
      description: "Mejl saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.password) {
    showMessage({
      message: "Varning!",
      description: "Lösenord saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (!userPropToAdd.personnummer) {
    showMessage({
      message: "Varning!",
      description: "Personnummer saknas!",
      type: "danger",
      duration: 2500,
    });
    return;
  }
  if (userPropToAdd.personnummer.length !== 12) {
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
    userPropToAdd.firstName &&
    userPropToAdd.secondName &&
    userPropToAdd.mejl &&
    userPropToAdd.password &&
    userPropToAdd.personnummer
  ) {
    const addPersonalDetails = async (user) => {
      const refUID = firestore().collection("Users").doc(user.uid);
      const userAlias = checkboxStateKurator ? "KURATOR" : "";
      await refUID.set({
        firstName: userPropToAdd.firstName,
        secondName: userPropToAdd.secondName,
        mejl: userPropToAdd.mejl,
        personNummer: userPropToAdd.personnummer,
        alias: userAlias,
        firstLogin: true,
        kurator: checkboxStateKurator,
        admin: checkboxStateAdmin,
      });
    };

    async function createNewUser() {
      try {
        await auth().createUserWithEmailAndPassword(
          userPropToAdd.mejl,
          userPropToAdd.password
        );

        const user = auth().currentUser;

        await addPersonalDetails(user);

        await auth().signOut();

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
