import React from 'react';
import {Text, View} from 'react-native';

const PersonalInfo = ({userDetails}) => {
  const {textStyling, viewStyle} = styles;

  return (
    <View style={viewStyle.container}>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Namn:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>hej</Text>
      </View>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Mail:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>{userDetails.mail}</Text>
      </View>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Personnummer:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>{userDetails.personNummer}</Text>
      </View>
    </View>
  );
};

const styles = {
  textStyling: {
    label: {
      fontSize: 16,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    },
    info: {
      fontSize: 20,
      color: 'grey',
      fontFamily: 'NunitoSans-Regular',
    },
  },

  viewStyle: {
    container: {
      // flexDirection: 'column',
      flex: 1,
      marginLeft: 5,
      //justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'grey'
    },
    label: {
      marginLeft: 10,
      marginTop: 30,
    },
    info: {
      marginLeft: 20,
      marginTop: 5,
    },
  },
};

export default PersonalInfo;
