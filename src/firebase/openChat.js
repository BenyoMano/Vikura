import getRoomName from "./roomName";
import { useContext, useState, useEffect } from "react";
import { IsCurrentUserKuratorContext } from "./isCurrentUserKuratorContext";
import auth from "@react-native-firebase/auth";

const useOpenChat = ({ setRoomId, messageLimit }) => {
  const { isCurrentUserKurator } = useContext(IsCurrentUserKuratorContext);
  const user = auth().currentUser;
  const clientUserId = user.uid;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const openChat = async (messageLimit) => {
    setIsLoading(true);

    if (isCurrentUserKurator === undefined) return;

    if (!isCurrentUserKurator) {
      clientUserId = user.uid;
    }

    const roomName = await getRoomName({ clientUserId });

    const unsubscribeList = roomName.docs.map((roomDetails) => {
      const roomId = roomDetails.id;

      const pathToMessages = firestore()
        .collection("rooms")
        .doc(roomId)
        .collection("messages");

      const unsubscribe = pathToMessages
        .orderBy("timestamp", "desc")
        .limit(30 + messageLimit)
        .onSnapshot((messageDetails) => {
          const newData = messageDetails.docs.map((documentSnapshot) => ({
            timestamp: documentSnapshot.data().timestamp.toMillis(),
            displayTimestamp: documentSnapshot.data().timestamp.toDate(),
            text: documentSnapshot.data().msg,
            isRead: documentSnapshot.data().isRead,
            author: documentSnapshot.data().author,
            id: documentSnapshot.data().id,
          }));
          setMessages(newData);
          setLoadingMessages(false);
        });

      if (isCurrentUserKurator) {
        pathToMessages
          .where("isRead", "==", false)
          .get()
          .then((a) => {
            a.forEach((doc) => {
              doc.ref.update({
                isRead: true,
              });
            });
          });
      }

      setRoomId(roomId);
      return unsubscribe;
    });

    return unsubscribeList;
  };

  useEffect(() => {
    const unsubscribeList = openChat(messageLimit);
    return () => {
      const unsubscribeToListener = async () => {
        const list = await unsubscribeList;
        list.forEach((unsubscribe) => {
          unsubscribe();
        });
      };
      unsubscribeToListener();
    };
  }, [messageLimit]);

  return { messages, isLoading };
};

export default useOpenChat;
