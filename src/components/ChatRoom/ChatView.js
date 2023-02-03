import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
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
        <View style={styles.greyScale.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
            <HeaderView
              navigation={navigation}
              kurator={isKurator}
              clientUserId={id}
              user={user}
              refPath={refPath}
            />
          </View>
          <View style={{flex: 1}}>
            <ChattRuta
              clientUserId={id}
              isKurator={isKurator}
              refPath={refPath}
              setRefPath={setRefPath}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '88%', marginBottom: '6%', borderWidth: 2, borderColor: 'blue'}}>
            <View style={{width: '100%', borderWidth: 2, borderColor: 'green'}}>
              <InputBarChatt
                msgToSend={msgToSend}
                setMsgToSend={setMsgToSend}
              />
            </View>
            <View style={{/* position: 'absolute', right: '0%' */}}>
              <ButtonSend
                title="Skicka"
                onPress={() => {
                  sendMessage({msgToSend, user, refPath, isKurator});
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

const styles = StyleSheet.create({
  greyScale: {
    container: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%'
    },
  },
});

export default ChatView;
