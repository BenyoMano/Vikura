import firestore from '@react-native-firebase/firestore';

const refPath = ({setRefPath}) => {
  const getRefPath = () => {
    getRoomName.docs.map(d => {
      const splitRef = d.ref.path.split('/');
      const last = splitRef[splitRef.length - 1];
      const docPath = firestore()
        .collection('rooms')
        .doc(last)
        .collection('messages');
      setRefPath(docPath);
      //console.log('docPath', docPath);
      // console.log('refPath', refPath);
    });
  };
  getRefPath();
};

export default refPath;
