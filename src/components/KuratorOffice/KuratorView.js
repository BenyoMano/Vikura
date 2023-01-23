import React from 'react';
import {View, StyleSheet} from 'react-native';
import Conv from './Conv';
import {HeaderView} from '.././Header/HeaderView';
import useColorStyle from '../../atoms/colorStyle';

const KuratorView = ({navigation}) => {
  const colorStyle = useColorStyle();

  return (
    <View style={[colorStyle ? styles.color.container : styles.greyScale.container, {flexDirection: 'column'}]}>
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
  color: {
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: "#f7e0b5",
      // backgroundColor: '#4d9b47',
      // backgroundColor: "#f7e0b5",
    }
  },
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
