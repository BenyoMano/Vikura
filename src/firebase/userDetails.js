import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const useUserPersonalDetails = ({clientUserId}) => {
  const [userDetails, setUserDetails] = useState(undefined);

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
