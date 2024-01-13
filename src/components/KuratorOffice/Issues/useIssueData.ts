import {useState, useCallback, SetStateAction} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {SelectedTab} from '../ManageUserScreen';

export type IssueData = {
  clientUserId: string;
  mail: string;
  category: 'problem' | 'opinion';
  timestamp: Date;
  message: string;
  fixed: boolean;
  docId: string;
};

type UseIssueDataProps = {
  setIsLoaded: React.Dispatch<SetStateAction<boolean>>;
  selectedTab: SelectedTab;
};

export const useIssueData = ({
  setIsLoaded,
  selectedTab,
}: UseIssueDataProps): IssueData[] => {
  const [issues, setIssues] = useState<IssueData[]>([]);
  const category = selectedTab === 'problem' ? 'problem' : 'opinion';

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromIssues: () => void;
      const fetchIssues = async () => {
        unsubscribeFromIssues = firestore()
          .collection('issues')
          .where('category', '==', category)
          .onSnapshot(
            onSnapshot => {
              const newIssues = onSnapshot.docs.map(requestDoc => {
                const clientUserId = requestDoc.data().id;
                const mail = requestDoc.data().mail;
                const category = requestDoc.data().category;
                const timestamp: any = requestDoc.data().timestamp.toDate();
                const message = requestDoc.data().issue;
                const fixed = requestDoc.data().fixed;
                const docId = requestDoc.id;
                return {
                  clientUserId,
                  mail,
                  category,
                  timestamp,
                  message,
                  fixed,
                  docId,
                };
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
    }, [selectedTab]),
  );

  return issues;
};
