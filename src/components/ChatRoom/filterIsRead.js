import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';


const filterIsRead = ({messages, pathToMessages, msgToSend, user, refPath}) => {

  if (!messages) return;

  console.log('Messages:', messages);
  const search = () => {
    messages.map(msgDetails => {
      console.log('ISREAD', msgDetails.isRead);
    })
  }
  search();
  
  const filterIsRead = messages.filter(msg => msg.isRead === false).map(msg => msg.timestamp)
  console.log('Find', filterIsRead);

  const updateIsRead = async () => {

    pathToMessages.doc

    const getUserData = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
    await refPath
      .add({
        author: getUserData.get('alias'),
        kurator: getUserData.get('kurator'),
        msg: msgToSend,
        isRead: false,
        timestamp: new Date(),
        id: user.uid,
      })
      .catch(error => {
        console.error(error);
      });
    console.log('=>', msgToSend);
  };
  updateIsRead();
};

export default filterIsRead;
