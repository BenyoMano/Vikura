import React, {useState} from 'react';
import {View, FlatList, ViewStyle} from 'react-native';
import {IssueData, useIssueData} from './useIssueData';
import IssueLoader from './IssueLoader';
import IssueItem from './IssueItem';

const IssueView = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const issue = useIssueData({setIsLoaded});

  const sortedRooms = issue.sort((a, b) => b.timestamp - a.timestamp);

  const renderItem = ({item}: {item: IssueData}) => (
    <IssueItem
      clientUserId={item.clientUserId}
      alias={item.alias}
      deleted={item.deleted}
      timestamp={item.timestamp}
    />
  );

  return (
    <View style={styles.container}>
      {!isLoaded ? (
        <IssueLoader />
      ) : (
        <FlatList
          horizontal={false}
          numColumns={1}
          data={sortedRooms}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    width: '88%',
    marginTop: '7%',
    marginBottom: '1%',
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  } as ViewStyle,
};

export default IssueView;
