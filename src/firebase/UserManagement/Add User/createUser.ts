import auth from '@react-native-firebase/auth';

const createUser = async ({userPropToAdd}) => {
  await auth().createUserWithEmailAndPassword(
    userPropToAdd.trimmedMejl,
    userPropToAdd.trimmedPassword,
  );
};
export default createUser;
