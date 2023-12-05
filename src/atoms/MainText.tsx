import React from 'react';
import {Text, View, TextStyle, ViewStyle} from 'react-native';

type MainTextProps = {
  title: string;
  style?: TextStyle;
};

const MainText: React.FC<MainTextProps> = props => {
  const {textStyling, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={[props.style, textStyling]}>{props.title}</Text>
    </View>
  );
};

const styles = {
  textStyling: {
    fontFamily: 'NunitoSans-Regular',
  },

  viewStyle: {
    alignItems: 'center',
  } as ViewStyle,
};

export default MainText;
