import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, RefreshControl, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import useColorStyle from '../../atoms/colorStyle';

const Conv = () => {
  const [convos, setConvos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const colorStyle = useColorStyle();


  const openConvo = async () => {
    const getRoomName = await firestore()
      .collection('rooms')
      .where('users.client.uid', '!=', '')
      .get();
      

    const newConvos = [];
    getRoomName.docs.map(roomDetails => {
      const clientAlias = roomDetails.data().users.client.alias;
      const clientId = roomDetails.data().users.client.uid;
      console.log('Client alias:', clientAlias);
      const splitRefPath = roomDetails.ref.path.split('/');
      const roomId = splitRefPath[splitRefPath.length - 1];
      const pathToMessages = firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages');

      pathToMessages
        .orderBy('timestamp')
        .limitToLast(1)
        .onSnapshot(lastMessage => {

          lastMessage.docs.forEach(lastMessageDetails => {
            newConvos.push({
              timestamp: lastMessageDetails.data().timestamp.toDate(),
              text: lastMessageDetails.data().msg,
              isRead: lastMessageDetails.data().isRead,
              alias: clientAlias,
              uid: clientId,
            });
          });
          console.log('newConvos', newConvos) 

          if( newConvos === []) return
          setConvos(newConvos)
        });
    });
    console.log('Convos :', convos)
    // convos.forEach(a =>
    //   console.log('Convo timestamp:', a.timestamp.toLocaleString()),
    // );
  }


  useEffect(() => {
    openConvo();
    return () => openConvo();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log('Refreshing...');
    openConvo();
    setRefreshing(false);
    console.log('--refreshed--');
  }, [refreshing]);

  function Item({alias, text, isRead, timestamp, uid}) {
    const navigation = useNavigation();
    console.log('isRead:', isRead);
    return (
      <Pressable 
      onPress={() => navigation.navigate('ChatView', {id: uid})}>
        <View style={colorStyle === true ? styles.color.item : styles.greyScale.item}>
          <View style={styles.header}>
            <Text style={styles.title}>{alias}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <View>
            <Text style={isRead ? styles.isRead.text : styles.notIsRead.text}>{text}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  const renderItem = ({item}) => (
    <Item
      timestamp={item.timestamp.toLocaleString()}
      alias={item.alias}
      text={item.text}
      isRead={item.isRead}
      uid={item.uid}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        numColumns={1}
        data={convos.sort((a, b) => b.timestamp.toLocaleString() - a.timestamp.toLocaleString())} //a.timestamp.localeCompare(b.timestamp) // a.timestamp < b.timestamp
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    flex: 1,
    width: 'auto',
    marginTop: 55,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    paddingBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: 'black',
    paddingTop: 5,
  },
  isRead: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    },
  },
  notIsRead: {
    text: {
      fontSize: 14,
      color: 'red',
      fontFamily: 'NunitoSans-Bold',
    },
  },
  color: {
    item: {
      padding: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      // backgroundColor: '#EEEEEE',
      backgroundColor: '#ffffe7',
      borderWidth: 1,
      // borderColor: '#EEEEEE',
      borderColor: '#ffffe7',
      borderBottomColor: 'black',
    },
  },
  greyScale: {
    item: {
      padding: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: '#EEEEEE',
      // backgroundColor: '#ffffe7',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      // borderColor: '#ffffe7',
      borderBottomColor: 'black',
    },
  },
};

export default Conv;
