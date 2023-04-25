/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import ChatBox from './ChatBox';
import InputBarChatt from './InputbarChat';
import ButtonSend from './ButtonSend';
import SendMessage from './sendMessage';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import auth from '@react-native-firebase/auth';
import {IsKuratorContext} from '../../firebase/isKuratorContext';


const ChatView = ({navigation, route}) => {
  const isKurator = useContext(IsKuratorContext);
  const [msgToSend, setMsgToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const [roomId, setRoomId] = useState();
  const {id} = route.params;
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
            }}>
            <HeaderView
              navigation={navigation}
              clientUserId={id}
              user={user}
              refPath={refPath}
            />
          </View>
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>

            <ChatBox
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
            <InputBarChatt msgToSend={msgToSend} setMsgToSend={setMsgToSend} />
            <ButtonSend
              title="Skicka"
              onPress={() => {
                SendMessage({isKurator, msgToSend, user, refPath, roomId});
                setMsgToSend('');
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

export default ChatView;
