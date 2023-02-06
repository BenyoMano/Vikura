const listenConv = async ({newConvos, pathToMessages, clientId, clientAlias}) => {
  
  
  await pathToMessages
  .orderBy('timestamp', 'desc')
  .limit(1)
  .get().then((lastMessage => {
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
  }));
};

export default listenConv;