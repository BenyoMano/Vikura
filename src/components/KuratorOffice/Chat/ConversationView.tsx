import React, {useState} from 'react';
import {View, FlatList, ViewStyle, TextInput} from 'react-native';
import ConvoLoader from './ConvoLoader';
import {RoomData, useRoomsData} from './useRoomsData';
import ConversationRoom from './ConversationRoom';
import MainText from '../../../atoms/MainText';

const ConversationView = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchString, setSearchString] = useState('');

  const rooms = useRoomsData({setIsLoaded, searchString});

  const renderItem = ({item}: {item: RoomData}) => (
    <ConversationRoom
      roomId={item.roomId}
      clientAlias={item.clientAlias}
      clientId={item.clientId}
      text={item.text}
      isRead={item.isRead}
      timestamp={item.timestamp}
    />
  );

  return (
    <>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setSearchString(text)}
        value={searchString}
        placeholder="Sök efter elev..."
        placeholderTextColor="#4F4F4F"
        underlineColorAndroid="transparent"
    />
    <View style={styles.container}>
      {!isLoaded ? (
        <ConvoLoader />
        ) :  rooms.length ? (
        <FlatList
          horizontal={false}
          numColumns={1}
          data={rooms}
          renderItem={renderItem}
          keyExtractor={item => item.roomId}
          />
      ):  <MainText title="Inga elever funna" style={{fontSize: 22, color: 'black'}} />}
    </View>
      </>
  );
};

const styles = {
  container: {
    flex: 1,
    width: 'auto',
    marginTop: '7%',
    marginBottom: '1%',
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  } as ViewStyle,
  textInput: {
    maxHeight: 250,
    width: 'auto',
    color: 'black',
    backgroundColor: '#EEEEEE',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    fontFamily: 'NunitoSans-Regular',
    marginHorizontal: 8,
  } as ViewStyle,
};

export default ConversationView;