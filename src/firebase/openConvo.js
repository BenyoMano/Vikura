import allRoomNames from './allRoomNames';
import getConvRefPath from './getConvRefPath';

const openConvo = async ({convos, setConvos, setConvRefPath}) => {

  // const getAllRoomNames = await firestore()
  // .collection('rooms')
  // .where('users.client.id', '!=', '')
  // .get();

  const rumNamn = await allRoomNames();

  const newConvos = [];

  getConvRefPath({newConvos, setConvRefPath, rumNamn, setConvos})

  // rumNamn.docs.map(roomDetails => {
  //   const clientAlias = roomDetails.data().users.client.alias;
  //   const clientId = roomDetails.data().users.client.id;
  //   console.log('Client alias:', clientAlias);
  //   const splitRefPath = roomDetails.ref.path.split('/');
  //   const roomId = splitRefPath[splitRefPath.length - 1];
    
  //   const pathToMessages = firestore()
  //     .collection('rooms')
  //     .doc(roomId)
  //     .collection('messages');

  //   setRefPath(pathToMessages);

    // pathToMessages
    //   .orderBy('timestamp')
    //   .limitToLast(1)
    //   .onSnapshot(lastMessage => {

    //     lastMessage.docs.forEach(lastMessageDetails => {
    //       newConvos.push({
    //         timestamp: lastMessageDetails.data().timestamp.toDate(),
    //         text: lastMessageDetails.data().msg,
    //         isRead: lastMessageDetails.data().isRead,
    //         alias: clientAlias,
    //         id: clientId,
    //       });
    //     });
    //     console.log('newConvos', newConvos) 

    //     if( newConvos === []) return;
    //     setConvos(newConvos)
    //   });
  // });

  console.log('Convos :', convos)

    // const rumNamn = await roomName({clientUserId}); 

};

export default openConvo;
