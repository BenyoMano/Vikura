/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import auth from "@react-native-firebase/auth";
import ChatBoxView from "./ChatBoxView";
import { HeaderView } from "../Header/HeaderView";
import ChatMessageComposer from "./ChatMessageComposer";
import { MyKeyboardAvoidingView } from "../../atoms/MyKeyboardAvoidingView";
import { IsCurrentUserKuratorContext } from "../../firebase/isCurrentUserKuratorContext";
import { useRoomId } from "../../firebase/useRoomId";

const ChatScreen = ({ navigation, route }) => {
  const { isCurrentUserKurator } = useContext(IsCurrentUserKuratorContext);
  const [refPath, setRefPath] = useState(false); //Context
  const clientUserId = route.params.id;

  const roomId = useRoomId(clientUserId);
  console.log("id", clientUserId);
  const user = auth().currentUser;

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderView
            navigation={navigation}
            clientUserId={clientUserId}
            user={user}
            refPath={refPath}
          />
          <ChatBoxView
            clientUserId={clientUserId}
            refPath={refPath}
            setRefPath={setRefPath}
          />
          <ChatMessageComposer
            isCurrentUserKurator={isCurrentUserKurator}
            user={user}
            roomId={roomId}
            refPath={refPath}
          />
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
});

export default ChatScreen;
