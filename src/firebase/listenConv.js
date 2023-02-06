const listenConv = ({newConvos, pathToMessages, clientId, clientAlias}) => {
  pathToMessages
  .orderBy('timestamp', 'desc')
  .limit(1)
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
  });
};

export default listenConv;