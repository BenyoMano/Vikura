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
    if (!isKurator) {
    clientUserId = user.uid;

    if (rumNamn.empty) {
      createRoom({clientUserId});
      showMessage({
        message: 'Välkommen!',
        description: 'Du kan börja chatta direkt!',
        type: 'info',
        position: 'center',
        floating: true,
        duration: 3000,
      });
    }
    }
    const rumNamn = await roomName({clientUserId});
    const unsubscribeList = getRefPath({isKurator, setRefPath, rumNamn, setMessages, msgLimit, setRoomId});
    return unsubscribeList;
  };
  return openChat;
};

export default useOpenChat;
