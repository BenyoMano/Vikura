import {useState, useCallback, SetStateAction} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export type IssueData = {
  clientUserId: string;
  alias: string;
  deleted: boolean;
  timestamp: FirebaseFirestoreTypes.Timestamp;
};

type UseIssueDataProps = {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
};

export const useIssueData = ({setIsLoaded}: UseIssueDataProps): IssueData[] => {
  const [issues, setIssues] = useState<IssueData[]>([]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromIssues: () => void;
      const fetchIssues = async () => {
        unsubscribeFromIssues = firestore()
          .collection('delete-requests')
          .onSnapshot(
            onSnapshot => {
              const newIssues = onSnapshot.docs.map(issueDoc => {
                const alias = issueDoc.data().alias;
                const deleted = issueDoc.data().deleted;
                const clientUserId = issueDoc.data().id;
                const timestamp: any = issueDoc.data().timestamp.toDate();
                return {alias, deleted, clientUserId, timestamp};
              });
              setIssues(newIssues);
            },
            error => {
              console.error('onSnapshot:', error);
            },
          );
        setIsLoaded(true);
      };
      fetchIssues();

      return () => {
        unsubscribeFromIssues();
      };
    }, []),
  );

  return issues;
};
