import { useEffect } from "react";

const listenMessages = ({
  isCurrentUserKurator,
  pathToMessages,
  setMessages,
  messageLimit,
  loadingMessages,
  setLoadingMessages
}) => {
  const unsubscribe = pathToMessages
      .orderBy('timestamp', 'desc')
      .limit(30 + messageLimit)
      .onSnapshot(messageDetails => {
        const newData = messageDetails.docs.map(documentSnapshot => ({
          timestamp: documentSnapshot.data().timestamp.toMillis(),
          displayTimestamp: documentSnapshot.data().timestamp.toDate(),
          text: documentSnapshot.data().msg,
          isRead: documentSnapshot.data().isRead,
          author: documentSnapshot.data().author,
          id: documentSnapshot.data().id,
        }));
        setMessages(newData);
        setLoadingMessages(false);
      });

        if (isCurrentUserKurator) {
        pathToMessages
          .where('isRead', '==', false)
          .get()
          .then(a => {
            a.forEach(doc => {
              doc.ref.update({
                isRead: true,
              });
            });
          });
      }

      return unsubscribe;
};

export default listenMessages;
