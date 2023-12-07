import React, {createContext, useState, useEffect, ReactNode} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type IsCurrentUserKuratorContextProps = {
  isCurrentUserKurator: boolean | undefined;
  isCurrentUserAdmin: boolean | undefined;
};

const IsCurrentUserKuratorContext = createContext<
  IsCurrentUserKuratorContextProps | undefined
>(undefined);

type IsCurrentUserKuratorProviderProps = {
  children: ReactNode;
};

const IsCurrentUserKuratorProvider: React.FC<
  IsCurrentUserKuratorProviderProps
> = ({children}) => {
  const [isCurrentUserKurator, setIsCurrentUserKurator] = useState<
    boolean | undefined
  >(undefined);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState<
    boolean | undefined
  >(undefined);
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

      const kurator: FirebaseFirestoreTypes.DocumentFieldType =
        firestoreUser.get('kurator');
      const isKurator: boolean = kurator as boolean;
      const admin: FirebaseFirestoreTypes.DocumentFieldType =
        firestoreUser.get('admin');
      const isAdmin: boolean = admin as boolean;
      setIsCurrentUserKurator(isKurator);
      setIsCurrentUserAdmin(isAdmin);
    };
    getKurator();
  }, [user]);

  return (
    <IsCurrentUserKuratorContext.Provider
      value={{isCurrentUserKurator, isCurrentUserAdmin}}>
      {children}
    </IsCurrentUserKuratorContext.Provider>
  );
};

export {IsCurrentUserKuratorContext, IsCurrentUserKuratorProvider};
