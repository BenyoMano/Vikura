import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {UserDetails} from '../../firebase/userDetails';

type PersonalInfoStyles = {
  textStyling: {
    label: TextStyle;
    info: TextStyle;
  };
  viewStyle: {
    container: ViewStyle;
    label: ViewStyle;
    info: ViewStyle;
  };
};

const PersonalInfo = ({userDetails}: {userDetails: UserDetails}) => {
  const {textStyling, viewStyle} = styles;

  return (
    <View style={viewStyle.container}>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Namn:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>
          {`${userDetails.firstName} ${userDetails.secondName}`}
        </Text>
      </View>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Mail:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>{String(userDetails.mail)}</Text>
      </View>
      <View style={viewStyle.label}>
        <Text style={textStyling.label}>Personnummer:</Text>
      </View>
      <View style={viewStyle.info}>
        <Text style={textStyling.info}>{Number(userDetails.personNummer)}</Text>
      </View>
    </View>
  );
};

const styles: PersonalInfoStyles = {
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
      flex: 1,
      justifyContent: 'flex-start',
      width: '88%',
      paddingLeft: 5,
      backgroundColor: '#f7f5f5',
      borderWidth: 2,
      borderRadius: 12,
      borderColor: 'grey',
      overflow: 'hidden',
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
