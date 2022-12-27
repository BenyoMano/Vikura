import firestore from '@react-native-firebase/firestore';


const refPath = ({setRefPath, newGetRoomName}) => {
  if (newGetRoomName === undefined) return;
  const getRefPath = () => {
    newGetRoomName.docs.map(d => {
      const splitRef = d.ref.path.split('/');
      const last = splitRef[splitRef.length - 1];
      const docPath = firestore()
        .collection('rooms')
        .doc(last)
        .collection('messages');
      setRefPath(docPath);
      console.log('Room Created Successfully!')
    });
  };
  getRefPath();
};

export default refPath;
