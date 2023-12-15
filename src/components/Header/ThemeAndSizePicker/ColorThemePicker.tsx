import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {PickerBlob} from './PickerBlob';
import {useBubbleColor} from './BubbleColorContext';

export const ColorThemePicker = ({}) => {
  const {colorCodes} = useBubbleColor();
  const {colorCode1, colorCode2, colorCode3} = colorCodes;

  return (
    <View style={styles.container}>
      <PickerBlob id={1} fill1={colorCode1.receive} fill2={colorCode1.send} />
      <PickerBlob id={2} fill1={colorCode2.receive} fill2={colorCode2.send} />
      <PickerBlob id={3} fill1={colorCode3.receive} fill2={colorCode3.send} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  } as ViewStyle,
});
