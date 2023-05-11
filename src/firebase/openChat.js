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
  loadingMessages,
  setLoadingMessages
}) => {
  const openChat = async messageLimit => {
    setLoadingMessages(true);

    if (isCurrentUserKurator === undefined) return;
    if (!isCurrentUserKurator) {
    clientUserId = user.uid;
      if (fetchRoomName.empty) {
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
    const fetchRoomName = await roomName({clientUserId});
    const unsubscribeList = getRefPath({isCurrentUserKurator, setRefPath, fetchRoomName, setMessages, messageLimit, setRoomId, loadingMessages, setLoadingMessages});
    return unsubscribeList;
  };
  return openChat;
};

export default useOpenChat;
