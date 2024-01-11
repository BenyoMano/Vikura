import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

type UseAliasProps = {
  clientUserId: string | undefined;
};

export const useAlias = ({clientUserId}: UseAliasProps) => {
  const [alias, setAlias] = useState<boolean>(false);
  useEffect(() => {
    if (!clientUserId) {
      return;
    }
    const unsubscribeListener = firestore()
      .collection('Users')
      .doc(clientUserId)
      .onSnapshot(
        documentSnapshot => {
          const userData = documentSnapshot.data();
          const userAlias = userData?.alias;
          setAlias(userAlias);
        },
        error => {
          console.error('newAlias:', error);
        },
      );
    return () => {
      unsubscribeListener();
    };
  }, [clientUserId]);

  return alias;
};
