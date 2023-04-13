import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SendMessage = ({isKurator, msgToSend, user, refPath, roomId}) => {
  if (!msgToSend) return;
  if (msgToSend.trim() === '') return;
  msgToSend = msgToSend.trim();
  const timestamp = new Date();

  const addMessage = async () => {
    const getUserData = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
    console.log('get alias', getUserData.get('alias'));
    await refPath
      .add({
        author: getUserData.get('alias'),
        kurator: getUserData.get('kurator'),
        msg: msgToSend,
        isRead: isKurator ? true : false,
        timestamp: timestamp,
        id: user.uid,
      })
      .catch(error => {
        console.error(error);
      });

    await firestore()
      .collection('rooms')
      .doc(roomId)
      .update({
        latestTimestamp: timestamp,
      })
      .catch(error => {
        console.error(error);
      });
  };

  addMessage();
};

export default SendMessage;
