import React, {useContext} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ChatBoxView from './ChatBoxView';
import {HeaderView} from '../Header/HeaderView';
import ChatMessageComposer from './ChatMessageComposer';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import {useRoomId} from '../../firebase/useRoomId';
import {FontSizeProvider} from '../Header/FontSizeSlider/FontSizeContext';

type ChatScreenProps = {
  navigation: any;
  route: {
    params: {
      id: string;
    };
  };
};

const ChatScreen: React.FC<ChatScreenProps> = ({navigation, route}) => {
  const contextValue = useContext(IsCurrentUserKuratorContext);
  const isCurrentUserKurator = contextValue?.isCurrentUserKurator;
  const clientUserId = route.params.id;

  const roomId = useRoomId(clientUserId);
  const user = auth().currentUser;

  return (
    <FontSizeProvider>
      <MyKeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <HeaderView navigation={navigation} clientUserId={clientUserId} />
            <ChatBoxView clientUserId={clientUserId} />
            <ChatMessageComposer
              isCurrentUserKurator={isCurrentUserKurator}
              user={user}
              roomId={roomId}
            />
          </View>
        </TouchableWithoutFeedback>
      </MyKeyboardAvoidingView>
    </FontSizeProvider>
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
  } as ViewStyle,
});

export default ChatScreen;
