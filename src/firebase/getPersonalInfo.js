import firestore from '@react-native-firebase/firestore';

const getPersonalInfo = async ({clientUserId}) => {
  const getName = await firestore().collection('Users').doc(clientUserId).get();
  const firstName = getName.get('kurator');

  console.log('First Name:', firstName);
};

export default getPersonalInfo;
