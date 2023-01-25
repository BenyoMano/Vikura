const listenConv = ({pathToMessages, setConvos, newConvos, clientId, clientAlias}) => {

  pathToMessages
  .orderBy('timestamp')
  .limitToLast(1)
  .onSnapshot(lastMessage => {

    lastMessage.docs.forEach(lastMessageDetails => {
      newConvos.push({
        timestamp: lastMessageDetails.data().timestamp.toMillis(),
        displayTimestamp: lastMessageDetails.data().timestamp.toDate(), 
        text: lastMessageDetails.data().msg,
        isRead: lastMessageDetails.data().isRead,
        alias: clientAlias,
        id: clientId,
      });
    });

    if( newConvos === []) return;
    setConvos(newConvos)
  });
};

export default listenConv;