import { useEffect } from "react";

const ListenMsg = ({
  isCurrentUserKurator,
  pathToMessages,
  setMessages,
  messageLimit,
  loadingMessages,
  setLoadingMessages
}) => {
  console.log('listenMsg - loadingMessages', loadingMessages);
  const unsubscribe = pathToMessages
      .orderBy('timestamp', 'desc')
      .limit(50 + messageLimit)
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
        console.log('setMessages', messageLimit);
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

export default ListenMsg;
