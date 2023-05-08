import { useEffect } from "react";
import BubblaView from './BubblaView';
import React, {useContext, useEffect, useState, useMemo, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Text, View} from 'react-native';
import BubblaView from './BubblaView';

function ListenMsg({
  isKurator,
  setMessages,
  msgLimit,
  setRefPath,
}) {

  useEffect(() => {



    const pathToMessages = firestore()
    .collection('rooms')
    .doc(roomId)
    .collection('messages');

    const unsubscribe = pathToMessages
      .orderBy('timestamp', 'desc')
      .limit(15 + msgLimit)
      .onSnapshot(messageDetails => {
        const newData = messageDetails.docs.map(documentSnapshot => ({
          timestamp: documentSnapshot.data().timestamp.toMillis(),
          displayTimestamp: documentSnapshot.data().timestamp.toDate(),
          text: documentSnapshot.data().msg,
          isRead: documentSnapshot.data().isRead,
          author: documentSnapshot.data().author,
          id: documentSnapshot.data().id,
        }));
        setMessages(newData);
        setRefPath(pathToMessages);
        console.log('setMessages', msgLimit);
      });
    return () => unsubscribe();
  }, [msgLimit])

  console.log(isKurator);

      //   if (isKurator) {
      //   await pathToMessages
      //     .where('isRead', '==', false)
      //     .get()
      //     .then(a => {
      //       a.forEach(doc => {
      //         doc.ref.update({
      //           isRead: true,
      //         });
      //       });
      //     });
      // }

      // function Message({text, id, displayTimestamp}) {
        const currentDay = new Date().toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        const currentYear = new Date().toLocaleString([], {year: 'numeric'});
    
        const sameDay =
          displayTimestamp.toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }) === currentDay
            ? true
            : false;
        const sameYear =
          displayTimestamp.toLocaleString([], {year: 'numeric'}) === currentYear
            ? true
            : false;
    
        return !isKurator ? (
          <View style={id === user.uid ? styles.bubblaSend : styles.bubblaRecieve}>
            <BubblaView
              text={text}
              id={id}
              clientUserId={clientUserId}
              user={user}
              isKurator={isKurator}
            />
            <View
              style={
                id === user.uid
                  ? styles.bubblaSend.timestamp
                  : styles.bubblaRecieve.timestamp
              }>
              <Text style={styles.text.author}>
                {sameDay
                  ? displayTimestamp.toLocaleString([], {
                      hour: 'numeric',
                      minute: 'numeric',
                    })
                  : sameYear
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
        ) : isKurator ? (
          <View
            style={id === clientUserId ? styles.bubblaRecieve : styles.bubblaSend}>
            <BubblaView
              text={text}
              id={id}
              clientUserId={clientUserId}
              user={user}
              isKurator={isKurator}
            />
            <View
              style={
                id === clientUserId
                  ? styles.bubblaRecieve.timestamp
                  : styles.bubblaSend.timestamp
              }>
              <Text style={styles.text.author}>
                {sameDay
                  ? displayTimestamp.toLocaleString([], {
                      hour: 'numeric',
                      minute: 'numeric',
                    })
                  : sameYear
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
      


};

export default ListenMsg;
