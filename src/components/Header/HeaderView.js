/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from './Logo';
import BackButton from './BackButton';
import AddUserButton from './AddUserButton';
import ButtonClear from '../ChatRoom/ButtonClear';
import clearMessages from './clearMessages';
import ReportConcernButton from './ReportConcernButton';
import {useRoute} from '@react-navigation/native';
import signOut from '../../firebase/signOut';
import {IsKuratorContext} from '../../firebase/isKuratorContext';
import LogoutButton from './LogoutButton';
import AdjustChatButton from './AdjustChatButton';
import HistoryButton from '../ChatRoom/HistoryButton';
import MinimizeButton from '../ChatRoom/MinimizeButton';

export const HeaderView = ({
  navigation,
  clientUserId,
  hasAddedUser,
  setHasAddedUser,
  msgLimit,
  setMsgLimit,
}) => {
  const route = useRoute();
  const isKurator = useContext(IsKuratorContext);
  const [showAdjustButtons, setShowAdjustButtons] = useState(true);
  const [closeAdjustButtons, setCloseAdjustButtons] = useState(false);

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

      {route.name === 'KuratorView' ? (
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
                navigation.navigate('Home');
              }}
            />
          </View>
          <View>
            <AddUserButton onPress={() => navigation.navigate('AddUserView')} />
          </View>
        </View>
      ) : route.name === 'AddUserView' ? (
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
                  navigation.navigate('Home');
                  setHasAddedUser(false);
                }}
              />
            ) : hasAddedUser === false ? (
              <BackButton onPress={() => navigation.goBack()} />
            ) : null}
          </View>
        </View>
      ) : route.name === 'NewKurator' ? (
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
      ) : route.name === 'NewClient' ? (
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
      ) : route.name === 'ReportConcern' ? (
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
      ) : route.name === 'ChatView' && isKurator ? (
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
          <View style={{position: 'absolute', right: '20%'}}>
            <ReportConcernButton
              onPress={() =>
                navigation.navigate('ReportConcern', {
                  clientUserId: clientUserId,
                })
              }
            />
          </View>
          <View style={{position: 'absolute', right: '0%'}}>
            <AdjustChatButton
              onPress={() =>
                {showAdjustButtons ? setTimeout(() => setShowAdjustButtons(false), 200) : setShowAdjustButtons(true)
                !closeAdjustButtons ? setCloseAdjustButtons(true) : setCloseAdjustButtons(false)}
              }
            />
          </View>
          {showAdjustButtons ? (
            <View>
              <View style={{position: 'absolute', bottom: -80, right: -5}}>
                <HistoryButton closeAdjustButtons={closeAdjustButtons} msgLimit={msgLimit} setMsgLimit={setMsgLimit} />
              </View>
              <View style={{position: 'absolute', bottom: -140, right: -5}}>
                <MinimizeButton closeAdjustButtons={closeAdjustButtons} setMsgLimit={setMsgLimit} />
              </View>
            </View>
          ) : null}
        </View>
      ) : route.name === 'ChatView' && !isKurator ? (
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
              navigation.navigate('Home');
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
