import {} from 'react-native';

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
