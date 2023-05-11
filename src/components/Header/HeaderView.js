/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from './Logo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import {IsCurrentUserKuratorContext} from '../../firebase/isCurrentUserKuratorContext';
import LogoutButton from './LogoutButton';
// import AdjustChatButton from './AdjustChatButton';
// import HistoryButton from '../ChatRoom/HistoryButton';
// import MinimizeButton from '../ChatRoom/MinimizeButton';

export const HeaderView = ({
  navigation,
  clientUserId,
  hasAddedUser,
  setHasAddedUser,
}) => {
  const route = useRoute();
  const {isCurrentUserKurator, isCurrentUserAdmin} = useContext(IsCurrentUserKuratorContext);
  // const [showAdjustButtons, setShowAdjustButtons] = useState(false);
  // const [closeAdjustButtons, setCloseAdjustButtons] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '88%',
        alignItems: 'center',
        marginTop: '12%',
      }}>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          right: '50%',
        }}>
        <Logo style={{width: 90, height: 35}} />
      </View>

      {route.name === 'KuratorScreen' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <LogoutButton
              title="Logga Ut"
              onPress={() => {
                signOut();
                navigation.navigate('HomeScreen');
              }}
            />
          </View>
          {isCurrentUserAdmin ? (
            <View>
              <AddUserButton onPress={() => navigation.navigate('AddUserScreen')} />
            </View>
          ) : null}
        </View>
      ) : route.name === 'AddUserScreen' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            {hasAddedUser === true ? (
              <LogoutButton
                onPress={() => {
                  signOut();
                  navigation.navigate('HomeScreen');
                  setHasAddedUser(false);
                }}
              />
            ) : hasAddedUser === false ? (
              <BackButton onPress={() => navigation.goBack()} />
            ) : null}
          </View>
        </View>
      ) : route.name === 'NewKuratorScreen' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'NewClientScreen' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ReportConcernScreen' ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      ) : route.name === 'ChatScreen' && isCurrentUserKurator ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          {/* <View style={{position: 'absolute', right: '15%'}}>
            <ButtonClear title="Clear" onPress={() => clearMessages({user, refPath})} />
          </View> */}
          <View style={{position: 'absolute', right: '0%'}}>
            <ReportConcernButton
              onPress={() =>
                navigation.navigate('ReportConcernScreen', {
                  clientUserId: clientUserId,
                })
              }
            />
          </View>
          {/* <View style={{position: 'absolute', right: '0%'}}>
            <AdjustChatButton
              onPress={() =>
                {showAdjustButtons ? setTimeout(() => setShowAdjustButtons(false), 200) : setShowAdjustButtons(true)
                !closeAdjustButtons ? setCloseAdjustButtons(true) : setCloseAdjustButtons(false)}
              }
            />
          </View> */}
          {/* {showAdjustButtons ? (
            <View>
              <View style={{position: 'absolute', bottom: -80, right: -5}}>
                <HistoryButton closeAdjustButtons={closeAdjustButtons} messageLimit={messageLimit} setMessageLimit={setMessageLimit} />
              </View>
              <View style={{position: 'absolute', bottom: -140, right: -5}}>
                <MinimizeButton closeAdjustButtons={closeAdjustButtons} setMessageLimit={setMessageLimit} />
              </View>
            </View>
          ) : null} */}
        </View>
      ) : route.name === 'ChatScreen' && !isCurrentUserKurator ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <LogoutButton
            title="Logga Ut"
            onPress={() => {
              signOut();
              navigation.navigate('HomeScreen');
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
