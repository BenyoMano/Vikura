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
import useColorStyle from '../../atoms/colorStyle';

const ChatView = ({navigation, route}) => {
  const [msgToSend, setMsgToSend] = useState();
  const [refPath, setRefPath] = useState(false);
  const isKurator = useIsKurator();
  const {id} = route.params;
  const user = auth().currentUser;
  const colorStyle = useColorStyle();

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={colorStyle === true ? styles.color.container : styles.greyScale.container}>
          <View style={{flexDirection: 'row', width: 360}}>
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

const styles = StyleSheet.create({
  color: {
    container: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#f7e0b5',
      width: '100%'
    }
  },
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
