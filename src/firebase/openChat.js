import { showMessage } from 'react-native-flash-message';
import createRoom from './createRoom';
import refPath from './refPath';
import roomName from './roomName';

const openChat = async ({isKurator, user, clientUserId, setRefPath, setMessages}) => {
  console.log('isKurator:', isKurator)

  if (isKurator === undefined) return;

  if (isKurator) {

    const rumNamn = await roomName({clientUserId}); 
    refPath({setRefPath, rumNamn, setMessages});
  } else {

    clientUserId = user.uid;
    const rumNamn = await roomName({clientUserId});

    if (!rumNamn.empty) {
      refPath({setRefPath, rumNamn, setMessages});
    } else {
      createRoom({clientUserId});
      const rumNamn = await roomName({clientUserId});
      refPath({setRefPath, rumNamn, setMessages});
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
