import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import InputBarChatt from "./InputbarChat";
import SendButton from "./SendButton";

const ChatMessageComposer = ({
  isCurrentUserKurator,
  user,
  refPath,
  roomId,
}) => {
  const [messageToSend, setMessageToSend] = useState();

  const handleSendMessage = () => {
    if (!messageToSend) return;
    if (messageToSend.trim() === "") return;

    const trimmedMessageToSend = messageToSend.trim();

    const timestamp = new Date();
    console.log("refpath", refPath);

    const addMessage = async () => {
      try {
        const getUserData = firestore().collection("Users").doc(user.uid).get();

        await Promise.all([
          getUserData,
          firestore()
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
              author: getUserData.get("alias"),
              kurator: getUserData.get("kurator"),
              msg: trimmedMessageToSend,
              isRead: isCurrentUserKurator ? true : false,
              timestamp: timestamp,
              id: user.uid,
            }),
          firestore().collection("rooms").doc(roomId).update({
            latestTimestamp: timestamp,
          }),
        ]);
      } catch (error) {
        showMessage({
          message: "Varning!",
          description: String(error),
          type: "danger",
          duration: 3200,
        });
      }
    };

    addMessage();
    setMessageToSend("");
  };

  return (
    <View style={styles.viewStyle}>
      <InputBarChatt
        messageToSend={messageToSend}
        setMessageToSend={setMessageToSend}
      />
      <SendButton title="Skicka" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginBottom: "6%",
  },
});
export default ChatMessageComposer;
