import {StyleSheet, Text, View, ViewStyle, TextStyle} from 'react-native';
import React from 'react';

type CustomTrackMarkProps = {
  index: string;
};

export const CustomTrackMark: React.FC<CustomTrackMarkProps> = () => {
  return (
    <View
      style={{width: 3, height: 13, left: 18, backgroundColor: '#b3b3b3'}}
    />
  );
};

type CustomTrackIndicatorProps = {
  index: number;
};
export const CustomTrackIndicator: React.FC<CustomTrackIndicatorProps> = ({
  index,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 5,
    top: 5,
  } as ViewStyle,
  textStyle: {
    fontSize: 10,
    color: 'grey',
  } as TextStyle,
});
