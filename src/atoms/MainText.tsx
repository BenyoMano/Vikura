import React from 'react';
import {Text, View, TextStyle, ViewStyle, Animated} from 'react-native';

type MainTextProps = {
  title: string;
  style?: TextStyle | object;
};

const MainText: React.FC<MainTextProps> = props => {
  const {textStyling, viewStyle} = styles;

  return (
    <Animated.View style={viewStyle}>
      <Text style={[props.style, textStyling]}>{props.title}</Text>
    </Animated.View>
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
