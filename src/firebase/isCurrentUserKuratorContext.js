import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const IsCurrentUserKuratorContext = createContext();

const IsCurrentUserKuratorProvider = ({children}) => {
  const [isCurrentUserKurator, setIsCurrentUserKurator] = useState(undefined);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(undefined);
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const getKurator = async () => {
      const firestoreUser = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      const kurator = firestoreUser.get('kurator');
      const admin = firestoreUser.get('admin');
      setIsCurrentUserKurator(kurator);
      setIsCurrentUserAdmin(admin);
    };
    getKurator();
  }, [user]);

  return (
    <IsCurrentUserKuratorContext.Provider value={{isCurrentUserKurator, isCurrentUserAdmin}}>
      {children}
    </IsCurrentUserKuratorContext.Provider>
  );
};

export {IsCurrentUserKuratorContext, IsCurrentUserKuratorProvider};
