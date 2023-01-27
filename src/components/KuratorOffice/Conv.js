import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, RefreshControl, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import openConvo from '../../firebase/openConvo';
import ContentLoader, {Rect} from 'react-content-loader/native';

const Conv = () => {
  const [convos, setConvos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [convRefPath, setConvRefPath] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const ConvoLoader = () => {
    return (    
     <ContentLoader
        speed={1} 
        width={410}
        height={686}
        viewBox='0 0 410 686'
        backgroundColor='#EEEEEE'
        foregroundColor='#dedede'>
        <Rect x="0" y="0" rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y="86" rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={2*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={3*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={4*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={5*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={6*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={7*86} rx="0" ry="0" width="410" height="84" />
      </ContentLoader>)
  }


  useEffect(() => {
    openConvo({convos, setConvos, setConvRefPath, setIsLoaded});
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
        <View style={styles.greyScale.item}>
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
      {!isLoaded ? 
        ( 
          ConvoLoader()
        ) : 
        (
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
        )
      }
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
  greyScale: {
    item: {
      padding: 15,
      marginHorizontal: 0,
      marginVertical: 0,
      backgroundColor: '#EEEEEE',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      borderBottomColor: 'black',
    },
  },
};

export default Conv;
