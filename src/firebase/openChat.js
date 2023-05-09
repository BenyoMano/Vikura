import {showMessage} from 'react-native-flash-message';
import createRoom from './createRoom';
import getRefPath from './getRefPath';
import roomName from './roomName';

const useOpenChat = ({
  isCurrentUserKurator,
  user,
  clientUserId,
  setRefPath,
  setMessages,
  setRoomId,
}) => {
  const openChat = async messageLimit => {
    if (isCurrentUserKurator === undefined) return;
    if (!isCurrentUserKurator) {
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
    const unsubscribeList = getRefPath({isCurrentUserKurator, setRefPath, rumNamn, setMessages, messageLimit, setRoomId});
    return unsubscribeList;
  };
  return openChat;
};

export default useOpenChat;
