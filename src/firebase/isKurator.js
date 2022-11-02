import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useIsKurator = () => {
  const [kurator, setKurator] = useState({});
  const user = auth().currentUser;

  const getKurator = async () => {
    const askKurator = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
    const isKurator = askKurator.get('kurator');
    console.log('get Kurator:', isKurator);
    setKurator(isKurator);
  };
  getKurator();

  return {
    kurator,
    user,
  };
};

export default useIsKurator;
