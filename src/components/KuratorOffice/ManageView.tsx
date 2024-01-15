import React, {useState} from 'react';
import {View, FlatList, ViewStyle} from 'react-native';
import {DeleteData, useDeleteData} from './DeleteUser/useDeleteData';
import IssueLoader from './DeleteUser/IssueLoader';
import DeleteItem from './DeleteUser/DeleteItem';
import {SelectedTab} from './ManageUserScreen';
import IssueItem from './Issues/IssueItem';
import {useIssueData, IssueData} from './Issues/useIssueData';

type ManageViewProps = {
  selectedTab: SelectedTab;
};

const ManageView: React.FC<ManageViewProps> = ({selectedTab}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const requests = useDeleteData({setIsLoaded});
  const issues = useIssueData({setIsLoaded, selectedTab});
  const sortedRequests = requests.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
  const sortedIssues = issues.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );

  const ItemDelete = ({item}: {item: DeleteData}) => (
    <DeleteItem
      clientUserId={item.clientUserId}
      alias={item.alias}
      deleted={item.deleted}
      timestamp={item.timestamp}
    />
  );

  const ItemIssue = ({item}: {item: IssueData}) => (
    <IssueItem
      clientUserId={item.clientUserId}
      mail={item.mail}
      category={item.category}
      timestamp={item.timestamp}
      message={item.message}
      fixed={item.fixed}
      docId={item.docId}
    />
  );

  return (
    <View style={styles.container}>
      {!isLoaded ? (
        <IssueLoader />
      ) : selectedTab === 'delete' ? (
        <FlatList
          horizontal={false}
          numColumns={1}
          data={sortedRequests}
          renderItem={ItemDelete}
        />
      ) : (
        <FlatList
          horizontal={false}
          numColumns={1}
          data={sortedIssues}
          renderItem={ItemIssue}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: '7%',
    marginBottom: '1%',
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  } as ViewStyle,
};

export default ManageView;
