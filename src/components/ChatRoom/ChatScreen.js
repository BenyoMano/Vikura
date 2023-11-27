/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ChatBoxView from './ChatBoxView';
import {HeaderView} from '../Header/HeaderView';
import ChatMessageComposer from './ChatMessageComposer';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import {useRoomId} from '../../firebase/useRoomId';
import {FontSizeProvider} from '../Header/FontSizeContext';

const ChatScreen = ({navigation, route}) => {
  const {isCurrentUserKurator} = useContext(IsCurrentUserKuratorContext);
  const clientUserId = route.params.id;

  const roomId = useRoomId(clientUserId);
  const user = auth().currentUser;

  return (
    <FontSizeProvider>
      <MyKeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <HeaderView navigation={navigation} clientUserId={clientUserId} />
            <ChatBoxView clientUserId={clientUserId} />
            <ChatMessageComposer
              isCurrentUserKurator={isCurrentUserKurator}
              user={user}
              roomId={roomId}
            />
          </View>
        </TouchableWithoutFeedback>
      </MyKeyboardAvoidingView>
    </FontSizeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
});

export default ChatScreen;
