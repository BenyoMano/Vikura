import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SendMessage = ({isKurator, msgToSend, user, refPath}) => {
  if (!msgToSend) return;
  if (msgToSend.trim() === '') return;
  msgToSend = msgToSend.trim();

  const addMessage = async () => {
    const getUserData = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
    await refPath
      .add({
        author: getUserData.get('alias'),
        kurator: getUserData.get('kurator'),
        msg: msgToSend,
        isRead: isKurator ? true : false,
        timestamp: new Date(),
        id: user.uid,
      })
      .catch(error => {
        console.error(error);
      });
  };
  addMessage();
};

export default SendMessage;
