import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import ChattRuta from './ChattRuta';
import InputBarChatt from './InputbarChat';
import ButtonSend from './ButtonSend';
import sendMessage from './sendMessage';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import useIsKurator from '../../firebase/isKurator';
import auth from '@react-native-firebase/auth';

const ChatView = ({navigation, route}) => {
  const [msgToSend, setMsgToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const isKurator = useIsKurator();
  const {id} = route.params;
  const user = auth().currentUser;

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row', width: 360}}>
            <HeaderView navigation={navigation} kurator={isKurator} />
          </View>
          <View style={{flex: 1}}>
            <ChattRuta // error: state on unmount
              clientUserId={id}
              isKurator={isKurator}
              //refPath={refPath}
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
