import React from 'react';
import {View, StyleSheet} from 'react-native';
import ConversationView from './ConversationView';
import {HeaderView} from '../Header/HeaderView';

const KuratorScreen = ({navigation}) => {
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
  },
});

export default KuratorScreen;
