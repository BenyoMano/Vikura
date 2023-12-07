import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

type StylingContainerProps = {
  children: ReactNode;
};

const StylingContainer: React.FC<StylingContainerProps> = ({children}) => {
  const {ViewStyle} = styles;

  return <View style={ViewStyle}>{children}</View>;
};

const styles = {
  ViewStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
};

export default StylingContainer;
