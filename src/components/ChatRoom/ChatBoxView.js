/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useState, useMemo, memo } from "react";
import auth from "@react-native-firebase/auth";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { IsCurrentUserKuratorContext } from "../../firebase/isCurrentUserKuratorContext";
import useOpenChat from "../../firebase/openChat";
import { useCallback } from "react";
import ChatBubble from "./ChatBubble";
import { onMomentumScrollEnd } from "./scrollHandlers";

const ChatBoxView = ({ refPath, setRefPath, clientUserId, setRoomId }) => {
  const { isCurrentUserKurator } = useContext(IsCurrentUserKuratorContext);
  //const [messages, setMessages] = useState([]);
  const [messageLimit, setMessageLimit] = useState(0);
  const user = auth().currentUser;
  console.log("BoxView isKurator", isCurrentUserKurator);

  // const openChat = useOpenChat({
  //   isCurrentUserKurator,
  //   user,
  //   clientUserId,
  //   refPath, // antagligen onödig
  //   setRefPath,
  //   setMessages,
  //   setRoomId,
  //   loadingMessages,
  //   setLoadingMessages
  // });

  const { messages, isLoading } = useOpenChat({
    setRoomId,
    messageLimit,
  });

  const renderItem = useCallback(
    ({ item }) => (
      <ChatBubble
        user={user}
        id={item.id}
        text={item.text}
        author={item.author}
        timestamp={item.timestamp}
        clientUserId={clientUserId}
        displayTimestamp={item.displayTimestamp}
        isCurrentUserKurator={isCurrentUserKurator}
      />
    ),
    [isCurrentUserKurator, user, clientUserId]
  );

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  );

  return (
    <View style={styles.flatListStyle}>
      <View style={styles.activityIndicatorStyle}>
        {isLoading ? <ActivityIndicator size={"large"} /> : null}
      </View>
      <AutoScrollFlatList
        // ref={flatListRef}
        horizontal={false}
        numColumns={1}
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp}
        scrollEnabled={true}
        scrollEventThrottle={160}
        showNewItemAlert={false}
        onMomentumScrollEnd={onMomentumScrollEnd(
          messageLimit,
          setMessageLimit,
          isLoading
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flatListStyle: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 30,
    marginBottom: 22,
    height: 550,
    width: "88%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "white",
  },
  activityIndicatorStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    top: "0%",
    paddingTop: 5,
    position: "absolute",
  },
});

export default ChatBoxView;
