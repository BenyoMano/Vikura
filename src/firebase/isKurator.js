import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const useIsKurator = () => {
  const [kurator, setKurator] = useState([]);
  const user = auth().currentUser;

  useEffect(() => {
    const getKurator = async () => {
      const askKurator = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const isKurator = askKurator.get('kurator');
      console.log('useIsKurator: Kurator:', isKurator);
      setKurator(isKurator);
    };
    getKurator();
  }, []);
  console.log('Outside useIsKurator, "kurator i setKurator":', kurator);

  return {
    kurator,
    user,
  };
};

export default useIsKurator;
