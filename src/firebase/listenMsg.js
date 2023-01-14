const listenMsg = ({pathToMessages, setMessages}) => {

  pathToMessages.onSnapshot(messageDetails => {

    const newData = messageDetails.docs.map(documentSnapshot => ({
      timestamp: documentSnapshot.data().timestamp.toMillis(),
      displayTimestamp: documentSnapshot.data().timestamp.toDate(), 
      text: documentSnapshot.data().msg,
      author: documentSnapshot.data().author,
      id: documentSnapshot.data().id,
    }));
    setMessages(newData);
  });
};

export default listenMsg;
