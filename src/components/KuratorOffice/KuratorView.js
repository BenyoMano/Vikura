import React from 'react';
import {View, StyleSheet} from 'react-native';
import Conv from './Conv';
import {HeaderView} from '.././Header/HeaderView';

const KuratorView = ({navigation}) => {

  return (
    <View style={[styles.greyScale.container, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        <HeaderView navigation={navigation} />
      </View>
      <View style={{flex: 1}}>
        <Conv />
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
    }
  },
});

export default KuratorView;
