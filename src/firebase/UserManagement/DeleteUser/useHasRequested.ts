import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

type UseHasRequestedProps = {
  clientUserId: string | undefined;
};

export const useHasRequested = ({clientUserId}: UseHasRequestedProps) => {
  const [hasRequested, setHasRequested] = useState<boolean>(false);
  useEffect(() => {
    if (!clientUserId) {
      return;
    }
    const unsubscribeListener = firestore()
      .collection('delete-requests')
      .where(firestore.FieldPath.documentId(), '==', clientUserId)
      .onSnapshot(querySnapshot => {
        const requestExists = querySnapshot.docs.some(doc => doc.exists);
        setHasRequested(requestExists);
      });
    return () => {
      unsubscribeListener();
    };
  }, [clientUserId]);

  return hasRequested;
};
