import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import ChattRuta from './ChattRuta';
import InputBarChatt from './InputbarChat';
import ButtonSend from './ButtonSend';
import sendMessage from './sendMessage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';

const ChatView = ({navigation, route}) => {
  const [msgToSend, setMsgToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const [kurator, setKurator] = useState();
  const {id} = route.params;

  const user = auth().currentUser;
  const getKurator = async () => {
    const askKurator = await firestore()
      .collection('Users')
      .doc(user.uid)
      .get();
    const isKurator = askKurator.get('kurator');
    console.log('get Kurator:', isKurator);
    setKurator(isKurator);
    //if (isKurator.get('kurator') == true)
  };
  getKurator();

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row', width: 360}}>
            <HeaderView navigation={navigation} kurator={kurator} />
          </View>
          <View style={{flex: 1}}>
            <ChattRuta // error: state on unmount
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
