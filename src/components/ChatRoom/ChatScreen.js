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


const ChatScreen = ({navigation, route}) => {
  const {isCurrentUserKurator} = useContext(IsCurrentUserKuratorContext);
  const [messageToSend, setMessageToSend] = useState();
  const [refPath, setRefPath] = useState(false); //Context
  const [roomId, setRoomId] = useState(); //Context
  const {id} = route.params;
  console.log('id', id);
  const user = auth().currentUser;
  
  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderView
            navigation={navigation}
            clientUserId={id}
            user={user}
            refPath={refPath}
          />
          <ChatBoxView
            clientUserId={id}
            refPath={refPath}
            setRefPath={setRefPath}
            setRoomId={setRoomId}
          />
          <ChatMessageComposer 
            messageToSend={messageToSend}
            setMessageToSend={setMessageToSend}
            isCurrentUserKurator={isCurrentUserKurator}
            user={user}
            refPath={refPath}
            roomId={roomId}
          />
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
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
