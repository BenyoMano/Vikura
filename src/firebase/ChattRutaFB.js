import firestore from '@react-native-firebase/firestore';

const ChattRuta = ({user, refPath, setRefPath, clientUserId}) => {
  const {viewStyle} = styles;
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getRefPath(getRoomName) {
    getRoomName.docs.map(d => {
      const splitRef = d.ref.path.split('/');
      const last = splitRef[splitRef.length - 1];
      const docPath = firestore()
        .collection('rooms')
        .doc(last)
        .collection('messages');
      setRefPath(docPath);

      console.log('RUN');
    });
  }

  async function runRefPath(refPath) {
    refPath.onSnapshot(querySnapshot => {
      const newData = querySnapshot.docs.map(documentSnapshot => ({
        timestamp: documentSnapshot.data().timestamp.toDate(),
        text: documentSnapshot.data().msg,
        author: documentSnapshot.data().author,
        uid: documentSnapshot.data().uid,
      }));
      setMessages(newData);
    });
  }

  const openChat = async () => {
    const isKurator = await firestore().collection('Users').doc(user.uid).get();
    console.log('Kurator:', isKurator.get('kurator'));
    if (isKurator.get('kurator') == true) {
      console.log('Client UserId', clientUserId);
      const getRoomName = await firestore()
        .collection('rooms')
        .where('users.client.uid', '==', clientUserId)
        .get();
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
        docPath.onSnapshot(querySnapshot => {
          const newData = querySnapshot.docs.map(documentSnapshot => ({
            timestamp: documentSnapshot.data().timestamp.toDate(),
            text: documentSnapshot.data().msg,
            author: documentSnapshot.data().author,
            uid: documentSnapshot.data().uid,
          }));
          setMessages(newData);
        });
      });
    } else {
      console.log('uid', user.uid);
      const getRoomName = await firestore()
        .collection('rooms')
        .where('users.client.uid', '==', user.uid)
        .get();
      console.log('Room name', getRoomName.empty);
      if (!getRoomName.empty) {
        getRoomName.docs.map(d => {
          const splitRef = d.ref.path.split('/');
          const last = splitRef[splitRef.length - 1];
          const docPath = firestore()
            .collection('rooms')
            .doc(last)
            .collection('messages');
          setRefPath(docPath);

          docPath.onSnapshot(querySnapshot => {
            console.log('RUM FINNS -- EFTER');
            const newData = querySnapshot.docs.map(documentSnapshot => ({
              timestamp: documentSnapshot.data().timestamp.toDate(),
              text: documentSnapshot.data().msg,
              author: documentSnapshot.data().author,
              uid: documentSnapshot.data().uid,
            }));
            setMessages(newData);
          });
        });
        // getRefPath(getRoomName);
        // runRefPath();
      } else {
        console.log('Room does not exist!');
        const createRoom = async () => {
          const roomRef = firestore().collection('rooms');
          console.log('Creating room');
          const getAlias = await firestore()
            .collection('Users')
            .doc(user.uid)
            .get();

          await roomRef.add({
            users: {
              client: {
                alias: getAlias.get('alias'),
                uid: user.uid,
              },
            },
          });
          //const getRoomName = await firestore().collection('rooms').where('users.client.uid', '==', user.uid).get();
          getRefPath(getRoomName);
        };
        createRoom();
      }
    }
  };
};

export default ChattRuta;
