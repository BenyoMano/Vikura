import firestore from '@react-native-firebase/firestore';

const addPersonalDetails = async ({
  user,
  userPropToAdd,
  checkboxStateAdmin,
  checkboxStateKurator,
}) => {
  const refUID = firestore().collection('Users').doc(user.uid);
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
};
export default addPersonalDetails;
