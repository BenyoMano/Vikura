import {showMessage} from 'react-native-flash-message';
import createRoom from './createRoom';
import getRefPath from './getRefPath';
import roomName from './roomName';

const useOpenChat = ({
  isKurator,
  user,
  clientUserId,
  setRefPath,
  setMessages,
  setRoomId,
}) => {
  const openChat = async msgLimit => {
    if (isKurator === undefined) return;

    if (isKurator) {
      const rumNamn = await roomName({clientUserId});
      getRefPath({isKurator, setRefPath, rumNamn, setMessages, msgLimit, setRoomId});
    } else {
      clientUserId = user.uid;
      const rumNamn = await roomName({clientUserId});

      if (!rumNamn.empty) {
        getRefPath({isKurator, setRefPath, rumNamn, setMessages, msgLimit, setRoomId});
      } else {
        createRoom({clientUserId});
        const rumNamn = await roomName({clientUserId});
        getRefPath({isKurator, setRefPath, rumNamn, setMessages, setRoomId});
        showMessage({
          message: 'Välkommen!',
          description: 'Du kan börja chatta direkt!',
          type: 'info',
          position: 'center',
          floating: true,
          duration: 2500,
        });
      }
    }
  };
  return openChat;
};

export default useOpenChat;
