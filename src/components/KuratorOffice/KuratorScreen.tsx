import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import ConversationView from './ConversationView';
import {HeaderView} from '../Header/HeaderView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {StackParamList} from '../../..';
import {StackParamList} from '../../../App';

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
});

export default KuratorScreen;
