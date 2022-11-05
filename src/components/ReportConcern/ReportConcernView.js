import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainText from '../../atoms/MainText';
import Button from '../../atoms/Button';
import CopyButton from './CopyButton';
import {Icon} from 'react-native-elements';
import PersonalInfo from './PersonalInfo';
import {HeaderView} from '../Header/HeaderView';

const ReportConcern = ({navigation}) => {
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
      <View style={{flex: 0.4}}>
        <MainText
          title="Personuppgifter:"
          style={{fontSize: 18, top: 0, color: 'grey'}}
        />
      </View>
      <View style={styles.viewStyle}>
        <PersonalInfo />
      </View>
      <View style={{width: 360, alignItems: 'flex-end'}}>
        <CopyButton />
      </View>
      <View style={{flex: 0.5}}>
        <Button title="Gör något" />
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
    marginTop: 10,
    //marginBottom: 22,
    height: 250,
    width: 360,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default ReportConcern;
