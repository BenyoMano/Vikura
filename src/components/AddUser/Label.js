import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Label = ({labelTitle}) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyling}>{labelTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 30,
  },
  textStyling: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
  },
});
