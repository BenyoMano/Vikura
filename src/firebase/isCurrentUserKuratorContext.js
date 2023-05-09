import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const IsCurrentUserKuratorContext = createContext();

const IsCurrentUserKuratorProvider = ({children}) => {
  const [isCurrentUserKurator, setIsCurrentUserKurator] = useState(undefined);
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getKurator = async () => {
      if (!user) return;
      const firestoreUser = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const kurator = firestoreUser.get('kurator');
      setIsCurrentUserKurator(kurator);
    };
    getKurator();
  }, [user]);

  return (
    <IsCurrentUserKuratorContext.Provider value={isCurrentUserKurator}>
      {children}
    </IsCurrentUserKuratorContext.Provider>
  );
};

export {IsCurrentUserKuratorContext, IsCurrentUserKuratorProvider};
