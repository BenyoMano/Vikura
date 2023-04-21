import React from "react"
import {View, Text, StyleSheet} from 'react-native';

const BubblaView = ({isKurator, text, id, clientUserId, user}) => {

    return !isKurator ? (
        <View
        style={[
         id === user.uid
            ? styles.bubblaSend.bubbla
            : styles.bubblaRecieve.bubbla,
        ]}>
        <Text style={styles.text.message}>{text}</Text>
        </View>

    ) : isKurator ? (
        <View
        style={[
          id === clientUserId
            ? styles.bubblaRecieve.bubbla
            : styles.bubblaSend.bubbla,
        ]}>
        <Text style={styles.text.message}>{text}</Text>
      </View>
    ) : null;
}

const styles = StyleSheet.create({
  text: {
    message: {
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    },
  },
  bubblaSend: {
    bubbla: {
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 5,
      marginRight: 10,
      padding: 9,
      minWidth: 0,
      maxWidth: '70%',
      backgroundColor: '#b5ccf7',
      borderRadius: 12,
    },
  },
  bubblaRecieve: {
    bubbla: {
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 10,
      padding: 9,
      minWidth: 0,
      maxWidth: '70%',
      backgroundColor: '#ffd933',
      borderRadius: 12,
    },
  },
})

export default BubblaView;