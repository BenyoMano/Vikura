import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import ChattRuta from './ChattRuta';
import InputBarChatt from './InputbarChat';
import ButtonSend from './ButtonSend';
import sendMessage from './sendMessage';
import auth from '@react-native-firebase/auth';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';

const ChatView = ({navigation, route}) => {
  const [msgToSend, setMsgToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const {id} = route.params;

  const user = auth().currentUser;

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row', width: 360}}>
            <HeaderView navigation={navigation} />
            {/*             <View style={{justifyContent: 'flex-start'}}>
              <BackButton onPress={() => navigation.goBack()} />
            </View>
            <View style={{position: 'absolute', left: '50%', right: '50%'}}>
              <Logo style={{width: 90, height: 35, marginTop: 32}} />
            </View>
            <View style={{position: 'absolute', left: '67%'}}>
              <ButtonClear title="Clear" onPress={() => clearMessages()} />
            </View>
            <View style={{position: 'absolute', left: '88%'}}>
              <ReportConcernButton
                onPress={() => navigation.navigate('ReportConcern')}
              />
            </View> */}
          </View>
          <View style={{flex: 1}}>
            <ChattRuta
              clientUserId={id}
              user={user}
              refPath={refPath}
              setRefPath={setRefPath}
            />
          </View>
          <View style={{flexDirection: 'row', width: 360, marginBottom: 30}}>
            <View style={{justifyContent: 'flex-start'}}>
              <InputBarChatt
                msgToSend={msgToSend}
                setMsgToSend={setMsgToSend}
              />
            </View>
            <View style={{position: 'absolute', right: '0%'}}>
              <ButtonSend
                title="Skicka"
                onPress={() => {
                  sendMessage({msgToSend, user, refPath});
                  setMsgToSend('');
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

export default ChatView;
