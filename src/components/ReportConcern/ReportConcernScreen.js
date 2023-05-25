/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MainText from '../../atoms/MainText';
import {Icon} from 'react-native-elements';
import PersonalInfo from './PersonalInfo';
import {HeaderView} from '../Header/HeaderView';
import {useClipboard} from '@react-native-clipboard/clipboard';
import useUserPersonalDetails from '../../firebase/userDetails';
import ClipboardHandler from './ClipboardHandler';
import SendMailButton from './SendMailButton';

const ReportConcernScreen = ({navigation, route}) => {
  const [clipboardString, setClipboardString] = useClipboard();
  const {clientUserId} = route.params;
  const userDetails = useUserPersonalDetails({clientUserId});
  if (userDetails === undefined) return;
  const detailsToSend = [
    'Namn: ' +
      userDetails.firstName +
      ' ' +
      userDetails.secondName +
      '\n' +
      'Mail: ' +
      userDetails.mail +
      '\n' +
      'Personnummer: ' +
      userDetails.personNummer,
  ];

  return (
    <View style={styles.container}>
      <HeaderView navigation={navigation} />
      <View style={styles.subHeader}>
        <MainText
          title="Orosanmälan"
          style={{fontSize: 32, marginRight: 10, top: 40, color: 'black'}}
        />
        <Icon name="warning" type="antdesign" color="#db4035" size={35} />
      </View>
      <View style={{flex: 0.3}}>
        <MainText
          title="Personuppgifter:"
          style={{fontSize: 18, top: 0, color: 'grey'}}
        />
      </View>
      <PersonalInfo userDetails={userDetails} />
      <ClipboardHandler
        clipboardString={clipboardString}
        setClipboardString={setClipboardString}
        userDetails={userDetails}
      />
      <SendMailButton
        title="Skicka mejl"
        detailsToSend={detailsToSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    flex: 0.4,
    width: 360,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ReportConcernScreen;
