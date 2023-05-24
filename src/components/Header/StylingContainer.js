import React from 'react';
import { View } from 'react-native';

const StylingContainer = ({children}) => {
  const {ViewStyle} = styles;

  return (
    <View style={ViewStyle}>
        {children}
    </View>
  );
};

const styles = {
  ViewStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default StylingContainer;