import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const CustomTrackMark = () => {
  return <View style={{width: 3, height: 13, backgroundColor: '#b3b3b3'}} />;
};

export const CustomTrackIndicator = ({index}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: -13,
    top: 5,
  },
  textStyle: {
    fontSize: 10,
  },
});
