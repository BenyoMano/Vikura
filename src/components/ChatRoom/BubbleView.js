import React from "react"
import {View, Text, StyleSheet} from 'react-native';

const BubbleView = ({isCurrentUserKurator, text, id, clientUserId, user}) => {

    return !isCurrentUserKurator ? (
        <View
        style={[
         id === user.uid
            ? styles.bubbleSend.bubble
            : styles.bubbleRecieve.bubble,
        ]}>
        <Text style={styles.text.message}>{text}</Text>
        </View>

    ) : isCurrentUserKurator ? (
        <View
        style={[
          id === clientUserId
            ? styles.bubbleRecieve.bubble
            : styles.bubbleSend.bubble,
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
  bubbleSend: {
    bubble: {
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
  bubbleRecieve: {
    bubble: {
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

export default BubbleView;