import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const useIsKurator = () => {
  const [isKurator, setIsKurator] = useState(undefined);
  const user = auth().currentUser;

  useEffect(() => {
    const getKurator = async () => {
      console.log('USER---->', user);
      const askKurator = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const newIsKurator = askKurator.get('kurator');
      console.log('useIsKurator: Kurator:', newIsKurator);
      setIsKurator(newIsKurator);
    };
    getKurator();
  }, [user.uid]);
  console.log('Outside useIsKurator, "kurator i setKurator":', isKurator);

  return isKurator;
};

export default useIsKurator;
