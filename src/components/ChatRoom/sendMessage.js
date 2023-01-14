import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const sendMessage = ({msgToSend, user, refPath}) => {
  const addMessage = async () => {
    const getUserData = await firestore()
      .collection('Users')
      .doc(user.id)
      .get();
    await refPath
      .add({
        author: getUserData.get('alias'),
        kurator: getUserData.get('kurator'),
        msg: msgToSend,
        isRead: false,
        timestamp: new Date(),
        id: user.id,
      })
      .catch(error => {
        console.error(error);
      });
    console.log('=>', msgToSend);
  };
  addMessage();
};

export default sendMessage;
