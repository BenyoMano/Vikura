import React, {useCallback, useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, View, RefreshControl} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import useColorStyle from '../../atoms/colorStyle';
import openChat from '../../firebase/openChat';

const ChattRuta = ({isKurator, setRefPath, clientUserId}) => {
  const {color, greyScale} = styles;
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const colorStyle = useColorStyle();
  const user = auth().currentUser;

  useEffect(() => {
    if (isKurator !== undefined) {
      openChat({isKurator, user, clientUserId, setRefPath, setMessages});
      return () => openChat();
    }  
  }, [isKurator]);

  const filterIsRead = messages.filter(msg => msg.isRead === false).map(msg => msg.timestamp)
  console.log('Find', filterIsRead)
  

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log('Refreshing...');
    openChat();
    setRefreshing(false);
    console.log('--refreshed--');
  }, [refreshing]);

  function Item({text, id, displayTimestamp}) {

    const currentDay = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'});
    const currentYear = new Date().toLocaleString([], {year: 'numeric'});

    const sameDay = displayTimestamp.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'}) === currentDay ? true : false;
    const sameYear = displayTimestamp.toLocaleString([], {year: 'numeric'}) === currentYear ? true : false;
    console.log('displayTimestamp:', displayTimestamp.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'}));
    console.log('Current day-----:', currentDay);
    console.log('Current Year----:', currentYear);
    console.log('Same day ?', sameDay);


    return (
       !isKurator ? (
        <View style={id === user.uid ? styles.bubblaSend : styles.bubblaRecieve}>
          <View
            style={
              id === user.uid
                ? styles.bubblaSend.bubbla
                : styles.bubblaRecieve.bubbla
            }>
            <Text style={styles.text.message}>{text}</Text>
          </View>
          <View
            style={
              id === user.uid
                ? styles.bubblaSend.timestamp
                : styles.bubblaRecieve.timestamp
            }>
            <Text style={styles.text.author}>
              {
                sameDay ? displayTimestamp.toLocaleString([], {hour: 'numeric', minute: 'numeric'})
                : sameYear ? displayTimestamp.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
                : displayTimestamp.toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric' })
              }
            </Text>
          </View>
        </View>
      ) : isKurator ? (
        <View style={id === clientUserId ? styles.bubblaRecieve : styles.bubblaSend }>
        <View
          style={
            id === clientUserId
              ? styles.bubblaRecieve.bubbla
              : styles.bubblaSend.bubbla
          }>
          <Text style={styles.text.message}>{text}</Text>
        </View>
        <View
          style={
            id === clientUserId
              ? styles.bubblaRecieve.timestamp
              : styles.bubblaSend.timestamp
          }>
          <Text style={styles.text.author}>
            {
              sameDay ? displayTimestamp.toLocaleString([], {hour: 'numeric', minute: 'numeric'})
              : sameYear ? displayTimestamp.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
              : displayTimestamp.toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric' })
            }
          </Text>
        </View>
      </View>
      ) : null
    );
  }
  const renderItem = ({item}) => (
    <Item
      timestamp={item.timestamp}
      displayTimestamp={item.displayTimestamp}
      text={item.text}
      author={item.author}
      id={item.id}
    />
  );
  return (
    <View style={colorStyle === true ? color.viewStyle : greyScale.viewStyle}>
      <AutoScrollFlatList
        horizontal={false}
        numColumns={1}
        data={messages.sort((a, b) => a.timestamp - b.timestamp)} //a.timestamp.localeCompare(b.timestamp))}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        //onScrollEndDrag
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
const styles = {
  color: {
    viewStyle: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: 30,
      marginBottom: 22,
      height: 550,
      width: 360,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: '#ffffe7'
    },
  },
  greyScale: {
    viewStyle: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: 30,
      marginBottom: 22,
      height: 550,
      width: 360,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: 'white'
    },
  },
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
  bubblaSend: {
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
      // backgroundColor: '#C7D4F6',
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
  bubblaRecieve: {
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
      // backgroundColor: '#FCF789',
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
};

export default ChattRuta;
