/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useState, useMemo} from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import useOpenChat from '../../firebase/openChat';
import {useCallback} from 'react';
import ChatBubble from './ChatBubble';
import {onMomentumScrollEnd} from './scrollHandlers';

const ChatBoxView = ({clientUserId}) => {
  const {isCurrentUserKurator} = useContext(IsCurrentUserKuratorContext);
  const [messageLimit, setMessageLimit] = useState(0);
  const user = auth().currentUser;

  const {messages, isLoading} = useOpenChat({
    messageLimit,
    clientUserId,
  });

  const renderItem = useCallback(
    ({item}) => (
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
    [isCurrentUserKurator, user, clientUserId],
  );

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.timestamp - b.timestamp),
    [messages],
  );

  return (
    <View style={styles.flatListStyle}>
      <View style={styles.activityIndicatorStyle}>
        {isLoading ? <ActivityIndicator size={'large'} /> : null}
      </View>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        scrollEnabled={true}
        scrollEventThrottle={160}
        showNewItemAlert={false}
        onMomentumScrollEnd={onMomentumScrollEnd(
          messageLimit,
          setMessageLimit,
          isLoading,
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flatListStyle: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 22,
    height: 550,
    width: '88%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  activityIndicatorStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    top: '0%',
    paddingTop: 5,
    position: 'absolute',
  },
});

export default ChatBoxView;
