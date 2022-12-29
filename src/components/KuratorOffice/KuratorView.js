import React from 'react';
import {View, StyleSheet} from 'react-native';
import Conv from './Conv';
import {HeaderView} from '.././Header/HeaderView';

const KuratorView = ({navigation}) => {
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row', width: 360}}>
        <HeaderView navigation={navigation} />
      </View>
      <View style={{flex: 1}}>
        <Conv />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#f7e0b5",
    // backgroundColor: '#4d9b47',
    // backgroundColor: "#f7e0b5",
  },
});

export default KuratorView;
