import React from "react"
import { useEffect } from "react";
import {Text, StyleSheet, Animated} from 'react-native';

const BubblaView = ({isKurator, text, id, clientUserId, user}) => {
    const animatedValue = new Animated.Value(1);


    // useEffect(() => {
    //     Animated.timing(animatedValue, {
    //         toValue: 1,
    //         duration: 300,
    //         useNativeDriver: true,
    //     }).start();
    // }, [])

    return !isKurator ? (
        <Animated.View
        style={[
         id === user.uid
            ? styles.bubblaSend.bubbla
            : styles.bubblaRecieve.bubbla,
            {
              transform: [
                {
                    scale: animatedValue,
                }
            ]}
        ]}>
        <Text style={styles.text.message}>{text}</Text>
        </Animated.View>

    ) : isKurator ? (
        <Animated.View
        style={[
          id === clientUserId
            ? styles.bubblaRecieve.bubbla
            : styles.bubblaSend.bubbla,
            {
              transform: [
                {
                  scale: animatedValue,
                }
              ]}
        ]}>
        <Text style={styles.text.message}>{text}</Text>
      </Animated.View>
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