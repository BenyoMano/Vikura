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
    getRoomName.docs.map(d => {
      const clientAlias = d.data().users.client.alias;
      const clientId = d.data().users.client.uid;
      console.log('Client alias:', clientAlias);
      const splitRef = d.ref.path.split('/');
      const last = splitRef[splitRef.length - 1];
      const docPath = firestore()
        .collection('rooms')
        .doc(last)
        .collection('messages');

      docPath
        .orderBy('timestamp')
        .limitToLast(1)
        .onSnapshot(a => {
          /*          const newConvos = a.docs.map(b => ({
            timestamp: b.data().timestamp.toDate(),
            text: b.data().msg,
            alias: clientAlias,
            uid: clientId,
          })); */
          a.docs.forEach(b => {
            console.log('msgUID', clientId);
            newConvos.push({
              timestamp: b.data().timestamp.toDate(),
              text: b.data().msg,
              alias: clientAlias,
              uid: clientId,
            });
          });
          setConvos(newConvos);
        });
    });
    convos.forEach(a =>
      console.log('Convo timestamp:', a.timestamp.toLocaleString()),
    );
  };

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

  function Item({alias, text, timestamp, uid}) {
    const navigation = useNavigation();
    return (
      <Pressable 
      onPress={() => navigation.navigate('ChatView', {id: uid})}>
        <View style={colorStyle === true ? styles.color.item : styles.greyScale.item}>
          <View style={styles.header}>
            <Text style={styles.title}>{alias}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  const renderItem = ({item}) => (
    <Item
      alias={item.alias}
      timestamp={item.timestamp.toLocaleString()}
      text={item.text}
      uid={item.uid}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        numColumns={1}
        data={convos.sort((a, b) => b.timestamp - a.timestamp)} //a.timestamp.localeCompare(b.timestamp) // a.timestamp < b.timestamp
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
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
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
