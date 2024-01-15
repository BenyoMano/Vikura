import {useState, useCallback, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export type IndicatorData = {
  deleteIndicator?: boolean;
  problemIndicator?: boolean;
  feedbackIndicator?: boolean;
  anyIndicator?: boolean;
};

export const useIndicator = (): IndicatorData => {
  const [problemIndicator, setProblemIndicator] = useState<boolean>(false);
  const [feedbackIndicator, setFeedbackIndicator] = useState<boolean>(false);
  const [deleteIndicator, setDeleteIndicator] = useState<boolean>(false);
  const [anyIndicator, setAnyIndicator] = useState<boolean>(false);

  useEffect(() => {
    if (problemIndicator || feedbackIndicator || deleteIndicator) {
      setAnyIndicator(true);
    } else {
      setAnyIndicator(false);
    }
  }, [problemIndicator, feedbackIndicator, deleteIndicator]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromProblems: () => void;
      const fetchProblems = async () => {
        unsubscribeFromProblems = firestore()
          .collection('issues')
          .where('category', '==', 'problem')
          .onSnapshot(
            onSnapshot => {
              const newProblems = onSnapshot.docs.map(requestDoc => {
                const fixed = requestDoc.data().fixed;
                return {fixed};
              });
              if (newProblems.some(a => !a.fixed)) {
                setProblemIndicator(true);
              }
            },
            error => {
              console.error('onSnapshot:', error);
            },
          );
      };
      fetchProblems();

      return () => {
        unsubscribeFromProblems();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromOpinions: () => void;
      const fetchOpinions = async () => {
        unsubscribeFromOpinions = firestore()
          .collection('issues')
          .where('category', '==', 'opinion')
          .onSnapshot(
            onSnapshot => {
              const newOpinions = onSnapshot.docs.map(requestDoc => {
                const fixed = requestDoc.data().fixed;
                return {fixed};
              });
              if (newOpinions.some(a => !a.fixed)) {
                setFeedbackIndicator(true);
              }
            },
            error => {
              console.error('onSnapshot:', error);
            },
          );
      };
      fetchOpinions();

      return () => {
        unsubscribeFromOpinions();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let unsubscribeFromDeleted: () => void;
      const fetchDeleted = async () => {
        unsubscribeFromDeleted = firestore()
          .collection('delete-requests')
          .onSnapshot(
            onSnapshot => {
              const newDeleted = onSnapshot.docs.map(requestDoc => {
                const deleted = requestDoc.data().deleted;
                return {deleted};
              });
              if (newDeleted.some(a => !a.deleted)) {
                setDeleteIndicator(true);
              }
            },
            error => {
              console.error('onSnapshot:', error);
            },
          );
      };
      fetchDeleted();

      return () => {
        unsubscribeFromDeleted();
      };
    }, []),
  );

  return {problemIndicator, feedbackIndicator, deleteIndicator, anyIndicator};
};
