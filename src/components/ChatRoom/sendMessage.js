import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { IsKuratorContext } from '../../firebase/isKuratorContext';
import { useContext } from 'react';


const sendMessage = ({msgToSend, user, refPath}) => {
  const isKurator = useContext(IsKuratorContext);
  // const 
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

export default sendMessage;
