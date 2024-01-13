import {useState, useCallback, SetStateAction} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export type DeleteData = {
  clientUserId: string;
  alias: string;
  deleted: boolean;
  timestamp: Date;
};

type UseDeleteDataProps = {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
};

export const useDeleteData = ({
  setIsLoaded,
}: UseDeleteDataProps): DeleteData[] => {
  const [requests, setRequests] = useState<DeleteData[]>([]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromRequests: () => void;
      const fetchRequests = async () => {
        unsubscribeFromRequests = firestore()
          .collection('delete-requests')
          .onSnapshot(
            onSnapshot => {
              const newRequests = onSnapshot.docs.map(requestDoc => {
                const alias = requestDoc.data().alias;
                const deleted = requestDoc.data().deleted;
                const clientUserId = requestDoc.data().id;
                const timestamp: any = requestDoc.data().timestamp.toDate();
                return {alias, deleted, clientUserId, timestamp};
              });
              setRequests(newRequests);
            },
            error => {
              console.error('onSnapshot:', error);
            },
          );
        setIsLoaded(true);
      };
      fetchRequests();

      return () => {
        unsubscribeFromRequests();
      };
    }, []),
  );

  return requests;
};
