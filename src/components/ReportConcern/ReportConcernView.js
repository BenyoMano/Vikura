import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MainText from '../../atoms/MainText';
import Button from '../../atoms/Button';
import CopyButton from './CopyButton';
import {Icon} from 'react-native-elements';
import PersonalInfo from './PersonalInfo';
import {HeaderView} from '../Header/HeaderView';
import {useClipboard} from '@react-native-clipboard/clipboard';
import useUserPersonalDetails from '../../firebase/userDetails';
import {Linking} from 'react-native';

const ReportConcern = ({navigation, route}) => {
  const [data, setString] = useClipboard();
  const {clientUserId} = route.params;
  const userDetails = useUserPersonalDetails({clientUserId});
  if (userDetails === undefined) return;
  console.log('userDetails', userDetails);
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
    <View
      style={[styles.greyScale.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        <HeaderView navigation={navigation} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'center',
          flex: 0.4,
          width: 360,
        }}>
        <View>
          <MainText
            title="Orosanmälan"
            style={{fontSize: 32, marginRight: 10, top: 40, color: 'black'}}
          />
        </View>
        <>
          <Icon name="warning" type="antdesign" color="#db4035" size={35} />
        </>
      </View>
      <View style={{flex: 0.3}}>
        <MainText
          title="Personuppgifter:"
          style={{fontSize: 18, top: 0, color: 'grey'}}
        />
      </View>
      <View style={styles.viewStyle}>
        <PersonalInfo userDetails={userDetails} />
      </View>
      <View style={{width: '88%', marginTop: 10, alignItems: 'flex-end'}}>
        <CopyButton
          onPress={() => {
            setString(
              '\n' +
                userDetails.firstName +
                ' ' +
                userDetails.secondName +
                '\n' +
                userDetails.mail +
                '\n' +
                userDetails.personNummer,
            );
            Alert.alert(
              'Kopierat till ditt ClipBoard: ',
              data,
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK'),
                },
              ],
              {
                cancelable: true,
              },
            );
          }}
        />
      </View>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Button
          title="Skicka mejl"
          onPress={() => {
            Linking.openURL(
              'mailto:?subject=Orosanmälan&body=' + detailsToSend,
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
    },
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 0,
    height: '61%',
    width: '88%',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default ReportConcern;
