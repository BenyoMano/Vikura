import { showMessage } from 'react-native-flash-message';
import filterIsRead from '../components/ChatRoom/filterIsRead';
import createRoom from './createRoom';
import getRefPath from './getRefPath';
import roomName from './roomName';

const openChat = async ({isKurator, user, clientUserId, setRefPath, setMessages}) => {
  console.log('isKurator:', isKurator)

  if (isKurator === undefined) return;

  if (isKurator) {

    const rumNamn = await roomName({clientUserId}); 
    getRefPath({setRefPath, rumNamn, setMessages});
    // filterIsRead();
  } else {

    clientUserId = user.uid;
    const rumNamn = await roomName({clientUserId});

    if (!rumNamn.empty) {
      getRefPath({setRefPath, rumNamn, setMessages});
    } else {
      createRoom({clientUserId});
      const rumNamn = await roomName({clientUserId});
      getRefPath({setRefPath, rumNamn, setMessages});
      showMessage({
        message: "Välkommen!",
        description: "Du kan börja chatta direkt!",
        type: "info",
        position: "center",
        floating: true,
        duration: 2500
      })
    }
  }
};

export default openChat;
