import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, RefreshControl, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useColorStyle from '../../atoms/colorStyle';
import openConvo from '../../firebase/openConvo';

const Conv = () => {
  const [convos, setConvos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [convRefPath, setConvRefPath] = useState(false);
  const colorStyle = useColorStyle();


 

  useEffect(() => {
    openConvo({convos, setConvos, setConvRefPath});
    return () => openConvo();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log('Refreshing...');
    openConvo();
    setRefreshing(false);
    console.log('--refreshed--');
  }, [refreshing]);

  function Item({alias, text, isRead, displayTimestamp, id}) {
    const navigation = useNavigation();
    return (
      <Pressable 
      onPress={() => navigation.navigate('ChatView', {id: id})}>
        <View style={colorStyle ? styles.color.item : styles.greyScale.item}>
          <View style={styles.header}>
            <Text style={styles.title}>{alias}</Text>
            <Text style={styles.timestamp}>{displayTimestamp.toLocaleString()}</Text>
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
      timestamp={item.timestamp}
      displayTimestamp={item.displayTimestamp}
      alias={item.alias}
      text={item.text}
      isRead={item.isRead}
      id={item.id}
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
      color: 'black',
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
