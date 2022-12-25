import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const clearMessages = ({user, refPath}) => {
  const clearMessage = async () => {

    const delMsg = await refPath.get().then(qs => {
      qs.forEach(doc => {
        doc.ref.delete();
      });
    });
  };
  clearMessage();
};

export default clearMessages;
