import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

type LabelProps = {
  labelTitle: string;
};

export const Label: React.FC<LabelProps> = ({labelTitle}) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyling}>{labelTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 30,
  } as ViewStyle,
  textStyling: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
  } as TextStyle,
});
