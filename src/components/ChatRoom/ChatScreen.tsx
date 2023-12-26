import React, {useContext} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import auth from '@react-native-firebase/auth';
import ChatBoxView from './ChatBoxView';
import {HeaderView} from '../Header/HeaderView';
import ChatMessageComposer from './ChatMessageComposer';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import {useRoomId} from '../../firebase/useRoomId';
import {FontSizeProvider} from '../Header/ThemeAndSizePicker/FontSizeContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {StackParamList} from '../../..';
import {StackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/native';
import {BubbleColorProvider} from '../Header/ThemeAndSizePicker/BubbleColorContext';

type ChatScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ChatScreen'
>;

type ChatScreenRouteProp = RouteProp<StackParamList, 'ChatScreen'>;

type ChatScreenProps = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<ChatScreenProps> = ({navigation, route}) => {
  const contextValue = useContext(IsCurrentUserKuratorContext);
  const isCurrentUserKurator = contextValue?.isCurrentUserKurator;
  const clientUserId = route.params.id;

  const roomId = useRoomId(clientUserId);
  const user = auth().currentUser;

  return (
    <FontSizeProvider>
      <BubbleColorProvider>
        <MyKeyboardAvoidingView>
          <View style={styles.container}>
            <HeaderView navigation={navigation} clientUserId={clientUserId} />
            <ChatBoxView clientUserId={clientUserId} />
            <ChatMessageComposer
              isCurrentUserKurator={isCurrentUserKurator}
              user={user}
              roomId={roomId}
            />
          </View>
        </MyKeyboardAvoidingView>
      </BubbleColorProvider>
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
