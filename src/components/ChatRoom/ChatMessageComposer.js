import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import InputBarChatt from './InputbarChat';
import SendButton from './SendButton';
import {useGeneralErrorHandling} from '../../ErrorHandling/errorHandling';

const ChatMessageComposer = ({isCurrentUserKurator, user, roomId}) => {
  const [messageToSend, setMessageToSend] = useState();

  const handleSendMessage = () => {
    if (!messageToSend) return;
    if (messageToSend.trim() === '') return;

    const trimmedMessageToSend = messageToSend.trim();

    const timestamp = new Date();

    const addMessage = async () => {
      try {
        const getUserData = await firestore()
          .collection('Users')
          .doc(user.uid)
          .get();

        if (!getUserData.exists) {
          throw new Error('Användare inte hittad!');
        }

        const addMessageData = await firestore()
          .collection('rooms')
          .doc(roomId)
          .collection('messages')
          .add({
            author: getUserData.get('alias'),
            kurator: getUserData.get('kurator'),
            msg: trimmedMessageToSend,
            isRead: isCurrentUserKurator ? true : false,
            timestamp: timestamp,
            id: user.uid,
          });

        const updateLatestTimestamp = await firestore()
          .collection('rooms')
          .doc(roomId)
          .update({
            latestTimestamp: timestamp,
          });

        await Promise.all([getUserData, addMessageData, updateLatestTimestamp]);
      } catch (error) {
        useGeneralErrorHandling({error, position: 'top'});
      }
    };

    addMessage();
    setMessageToSend('');
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginBottom: '6%',
  },
});

export default ChatMessageComposer;
