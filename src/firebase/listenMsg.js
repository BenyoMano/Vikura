import firestore from '@react-native-firebase/firestore';

const listenMsg = ({pathToMessages, setMessages}) => {

  pathToMessages.onSnapshot(messageDetails => {

    const newData = messageDetails.docs.map(documentSnapshot => ({
      timestamp: documentSnapshot.data().timestamp.toDate(),
      text: documentSnapshot.data().msg,
      author: documentSnapshot.data().author,
      uid: documentSnapshot.data().uid,
    }));
    setMessages(newData);
  });
};

export default listenMsg;
