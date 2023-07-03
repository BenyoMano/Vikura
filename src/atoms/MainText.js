import React from 'react';
import {Text, View} from 'react-native';

const MainText = props => {
  const {textStyling, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={[props.style, textStyling]} testID='maintext'>{props.title}</Text>
    </View>
  );
};

const styles = {
  textStyling: {
    fontFamily: 'NunitoSans-Regular',
  },

  viewStyle: {
    alignItems: 'center',
  },
};

export default MainText;
