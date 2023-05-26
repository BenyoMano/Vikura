import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const handleSendMessage = ({isCurrentUserKurator, messageToSend, user, refPath, roomId}) => {
  if (!messageToSend) return;
  if (messageToSend.trim() === '') return;
  messageToSend = messageToSend.trim();
  const timestamp = new Date();
  console.log('refpath', refPath);

  const addMessage = async () => {
    const getUserData = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
      
    await refPath
      .add({
        author: getUserData.get('alias'),
        kurator: getUserData.get('kurator'),
        msg: messageToSend,
        isRead: isCurrentUserKurator ? true : false,
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

export default handleSendMessage;
