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
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
      });

    await firestore()
      .collection('rooms')
      .doc(roomId)
      .update({
        latestTimestamp: timestamp,
      })
      .catch(error => {
        showMessage({
          message: 'Varning!',
          description: String(error),
          type: 'danger',
          duration: 3200,
        });
      });
  };

  addMessage();
};

export default SendMessage;
