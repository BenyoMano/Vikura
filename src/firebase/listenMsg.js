import { useEffect } from "react";

const ListenMsg = ({
  isKurator,
  pathToMessages,
  setMessages,
  msgLimit,
}) => {

  const unsubscribe = pathToMessages
      .orderBy('timestamp', 'desc')
      .limit(15 + msgLimit)
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
        console.log('setMessages', msgLimit);
      });

  console.log(isKurator);

        if (isKurator) {
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
