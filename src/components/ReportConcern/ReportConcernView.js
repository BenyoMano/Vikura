import React from 'react';
import {View, StyleSheet} from 'react-native';
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
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={{flexDirection: 'row', width: 360}}>
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
      <View style={{width: 360, alignItems: 'flex-end'}}>
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
            alert('Kopierade: ' + data);
          }}
        />
      </View>
      <View style={{flex: 0.5}}>
        <Button
          title="Gör något"
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
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 0,
    //marginBottom: 22,
    height: 250,
    width: 360,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default ReportConcern;
