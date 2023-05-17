/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import ChatBoxView from './ChatBoxView';
import InputBarChatt from './InputbarChat';
import SendButton from './SendButton';
import handleSendMessage from './handleSendMessage';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import auth from '@react-native-firebase/auth';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';


const ChatScreen = ({navigation, route}) => {
  const {isCurrentUserKurator} = useContext(IsCurrentUserKuratorContext);
  const [messageToSend, setMessageToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const [roomId, setRoomId] = useState();
  const {id} = route.params;
  console.log('id', id);
  const user = auth().currentUser;
  
  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.greyScale.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              zIndex: 2,
            }}>
            <HeaderView
              navigation={navigation}
              clientUserId={id}
              user={user}
              refPath={refPath}
            />
          </View>
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>

            <ChatBoxView
              clientUserId={id}
              refPath={refPath}
              setRefPath={setRefPath}
              setRoomId={setRoomId}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '88%',
              marginBottom: '6%',
            }}>
            <InputBarChatt messageToSend={messageToSend} setMessageToSend={setMessageToSend} />
            <SendButton
              title="Skicka"
              onPress={() => {
                handleSendMessage({isCurrentUserKurator, messageToSend, user, refPath, roomId});
                setMessageToSend('');
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
    },
  },
});

export default ChatScreen;
