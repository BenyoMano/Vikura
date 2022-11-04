//import firestore from '@react-native-firebase/firestore';

const listenMsg = () => {
  docPath.onSnapshot(querySnapshot => {
    const newData = querySnapshot.docs.map(documentSnapshot => ({
      timestamp: documentSnapshot.data().timestamp.toDate(),
      text: documentSnapshot.data().msg,
      author: documentSnapshot.data().author,
      uid: documentSnapshot.data().uid,
    }));
    setMessages(newData);
  });
};

export default listenMsg;
