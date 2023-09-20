import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import ConvoLoader from './ConvoLoader';
import {useRoomsData} from './useRoomsData';
import ConversationRoom from './ConversationRoom';

const ConversationView = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const rooms = useRoomsData({setIsLoaded});

  const sortedRooms = rooms.sort(
    (a, b) => b.latestTimestamp - a.latestTimestamp,
  );

  const renderItem = ({item}) => (
    <ConversationRoom
      roomId={item.roomId}
      clientAlias={item.clientAlias}
      clientId={item.clientId}
      key={item}
    />
  );

  return (
    <View style={styles.container}>
      {!isLoaded ? (
        <ConvoLoader />
      ) : (
        <FlatList
          horizontal={false}
          numColumns={1}
          data={sortedRooms}
          renderItem={renderItem}
          keyExtractor={item => item.roomId}
        />
      )}
    </View>
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
  },
};

export default ConversationView;
