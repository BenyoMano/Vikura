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
    
    console.log('BEFORE', clientUserId);
    console.log('isCurrentUserKurator', isCurrentUserKurator);
    if (isCurrentUserKurator === undefined) return;
    console.log('AFTER');
    
    if (!isCurrentUserKurator) {
      clientUserId = user.uid;
      console.log('Changing uid');
    }
    console.log('uid', clientUserId);
    const fetchRoomName = await roomName({clientUserId});
    const unsubscribeList = getRefPath({isCurrentUserKurator, setRefPath, fetchRoomName, setMessages, messageLimit, setRoomId, loadingMessages, setLoadingMessages});
    return unsubscribeList;
  };
  return openChat;
};

export default useOpenChat;
