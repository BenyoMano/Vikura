/* eslint-disable react/no-unstable-nested-components */
import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BubbleView from './BubbleView';


const ChatBubble = memo(({user, id, text, clientUserId, displayTimestamp, isCurrentUserKurator}) => {
    const currentDay = new Date().toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const currentYear = new Date().toLocaleString([], {year: 'numeric'});
  
    const isSameDay =
      displayTimestamp.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }) === currentDay
        ? true
        : false;
    const isSameYear =
      displayTimestamp.toLocaleString([], {year: 'numeric'}) === currentYear
        ? true
        : false;
  
    return !isCurrentUserKurator ? (
      <View style={id === user.uid ? styles.bubbleSend : styles.bubbleRecieve}>
        <BubbleView
          text={text}
          id={id}
          clientUserId={clientUserId}
          user={user}
          isCurrentUserKurator={isCurrentUserKurator}
        />
        <View
          style={
            id === user.uid
              ? styles.bubbleSend.timestamp
              : styles.bubbleRecieve.timestamp
          }>
          <Text style={styles.text.author}>
            {isSameDay
              ? displayTimestamp.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : isSameYear
              ? displayTimestamp.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : isCurrentUserKurator ? (
      <View
        style={id === clientUserId ? styles.bubbleRecieve : styles.bubbleSend}>
        <BubbleView
          text={text}
          id={id}
          clientUserId={clientUserId}
          user={user}
          isCurrentUserKurator={isCurrentUserKurator}
        />
        <View
          style={
            id === clientUserId
              ? styles.bubbleRecieve.timestamp
              : styles.bubbleSend.timestamp
          }>
          <Text style={styles.text.author}>
            {isSameDay
              ? displayTimestamp.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : isSameYear
              ? displayTimestamp.toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : displayTimestamp.toLocaleString([], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
          </Text>
        </View>
      </View>
    ) : null;
  });

  const styles = StyleSheet.create({
    text: {
      message: {
        color: 'black',
        fontFamily: 'NunitoSans-Regular',
      },
      author: {
        color: 'grey',
        fontFamily: 'NunitoSans-Light',
        fontSize: 10,
      },
    },
    bubbleSend: {
      flexDirection: 'row-reverse',
      alignSelf: 'flex-end',
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
      timestamp: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: 8,
        marginRight: 10,
      },
    },
    bubbleRecieve: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
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
      timestamp: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: 8,
        marginLeft: 10,
      },
    },
  });

  export default ChatBubble;