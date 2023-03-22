import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const IsKuratorContext = createContext();

const IsKuratorProvider = ({children}) => {
  const [isKurator, setIsKurator] = useState(undefined);
  const user = auth().currentUser;

  useEffect(() => {
    const getKurator = async () => {
      if (!user) return;
      const firestoreUser = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const kurator = firestoreUser.get('kurator');
      setIsKurator(kurator);
    };
    getKurator();
  }, [user]);

  return (
    <IsKuratorContext.Provider value={isKurator}>
      {children}
    </IsKuratorContext.Provider>
  );
};
// export const useIsKurator = () => useContext(IsKuratorContext)
export {IsKuratorContext, IsKuratorProvider};
