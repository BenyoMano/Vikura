import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useGeneralErrorHandling} from '../ErrorHandling/errorHandling';

export type UserDetails = {
  alias: FirebaseFirestoreTypes.DocumentFieldType;
  firstName: FirebaseFirestoreTypes.DocumentFieldType;
  secondName: FirebaseFirestoreTypes.DocumentFieldType;
  mail: FirebaseFirestoreTypes.DocumentFieldType;
  personNummer: FirebaseFirestoreTypes.DocumentFieldType;
};

const useUserPersonalDetails = ({
  clientUserId,
}: {
  clientUserId: string | undefined;
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    const getUserDetails = async () => {
      if (clientUserId !== undefined) {
        try {
          const getDetail = await firestore()
            .collection('Users')
            .doc(clientUserId)
            .get();

          const alias = getDetail.get('alias');
          const firstName = getDetail.get('firstName');
          const secondName = getDetail.get('secondName');
          const mail = getDetail.get('mail');
          const personNummer = getDetail.get('personNummer');

          setUserDetails({alias, firstName, secondName, mail, personNummer});
        } catch (error) {
          useGeneralErrorHandling({error, position: 'top'});
        }
      }
    };
    getUserDetails();
  }, [clientUserId]);
  return userDetails;
};

export default useUserPersonalDetails;
