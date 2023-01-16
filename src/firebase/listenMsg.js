import firestore from '@react-native-firebase/firestore';


const listenMsg = async ({pathToMessages, setMessages}) => {

  // const filterIsRead = messages.filter(msg => msg.isRead === false).map(msg => msg.timestamp)
  // console.log('Find', filterIsRead)
  
  // const what = await pathToMessages.where('timestamp', '!=', '').get();

  // console.log('What', what);
  // what.docs.map(a => {
  //   console.log('what specific', a.data().timestamp)
  // })

  pathToMessages.onSnapshot(messageDetails => {

    const newData = messageDetails.docs.map(documentSnapshot => ({
      timestamp: documentSnapshot.data().timestamp.toMillis(),
      displayTimestamp: documentSnapshot.data().timestamp.toDate(), 
      text: documentSnapshot.data().msg,
      isRead: documentSnapshot.data().isRead,
      author: documentSnapshot.data().author,
      id: documentSnapshot.data().id,
    }));
    setMessages(newData);
  });

  const whatta = await pathToMessages.where('isRead', '==', false).get();

  console.log('Whatta', whatta.docs);
  whatta.docs.forEach(element => {
    console.log('Spec', element.data().isRead)
  });

};

export default listenMsg;
