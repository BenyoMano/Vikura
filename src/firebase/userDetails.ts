import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

type UserDetails = {
  firstName: FirebaseFirestoreTypes.DocumentFieldType;
  secondName: FirebaseFirestoreTypes.DocumentFieldType;
  mail: FirebaseFirestoreTypes.DocumentFieldType;
  personNummer: FirebaseFirestoreTypes.DocumentFieldType;
};

const useUserPersonalDetails = ({clientUserId}: {clientUserId: string}) => {
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    const getUserDetails = async () => {
      const getDetail = await firestore()
        .collection('Users')
        .doc(clientUserId)
        .get();

      const firstName = getDetail.get('firstName');
      const secondName = getDetail.get('secondName');
      const mail = getDetail.get('mejl');
      const personNummer = getDetail.get('personNummer');

      setUserDetails({firstName, secondName, mail, personNummer});
    };
    getUserDetails();
  }, []);
  return userDetails;
};

export default useUserPersonalDetails;
