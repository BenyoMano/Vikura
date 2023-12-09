import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import InputBarChatt from './InputbarChat';
import SendButton from './SendButton';
import {useGeneralErrorHandling} from '../../ErrorHandling/errorHandling';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ChatMessageComposerProps = {
  isCurrentUserKurator: boolean | undefined;
  user: FirebaseAuthTypes.User | null;
  roomId: string | undefined;
};

const ChatMessageComposer: React.FC<ChatMessageComposerProps> = ({
  user,
  roomId,
  isCurrentUserKurator,
}) => {
  const [messageToSend, setMessageToSend] = useState<string>('');

  const handleSendMessage = () => {
    if (!messageToSend) return;
    if (messageToSend.trim() === '') return;

    const trimmedMessageToSend = messageToSend.trim();

    const timestamp = new Date();

    const addMessage = async () => {
      try {
        const getUserData = await firestore()
          .collection('Users')
          .doc(user?.uid)
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
            id: user?.uid,
          });

        const updateLatestTimestamp = await firestore()
          .collection('rooms')
          .doc(roomId)
          .update({
            latestTimestamp: timestamp,
          });

        await Promise.all([addMessageData, updateLatestTimestamp]);
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
  } as ViewStyle,
});

export default ChatMessageComposer;
