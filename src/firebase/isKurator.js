import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const useIsKurator = () => {
  const [isKurator, setIsKurator] = useState(undefined);
  const user = auth().currentUser;

  useEffect(() => {
    const getKurator = async () => {
      const askKurator = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const newIsKurator = askKurator.get('kurator');
      setIsKurator(newIsKurator);
    };
    getKurator();
  }, [user.uid]);

  return isKurator;
};

export default useIsKurator;
