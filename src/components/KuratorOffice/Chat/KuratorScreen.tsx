import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import ConversationView from './ConversationView';
import {HeaderView} from '../../Header/HeaderView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../../App';
import MainText from '../../../atoms/MainText';

type KuratorScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'KuratorScreen'
>;

type KuratorScreenProps = {
  navigation: KuratorScreenNavigationProp;
};

const KuratorScreen: React.FC<KuratorScreenProps> = ({navigation}) => {
  return (
    <View style={[styles.KuratorContainer, {flexDirection: 'column'}]}>
      <HeaderView navigation={navigation} />
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <MainText title="Chattar" style={{fontSize: 22, color: 'black'}} />
        </View>
        <ConversationView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  KuratorContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default KuratorScreen;
