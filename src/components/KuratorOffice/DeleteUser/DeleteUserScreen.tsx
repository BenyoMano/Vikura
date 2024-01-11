import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import ConversationView from '../ConversationView';
import {HeaderView} from '../../Header/HeaderView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../../App';
import MainText from '../../../atoms/MainText';
import TabButton from '../../../atoms/TabButton';
import IssueView from './IssueView';

type DeleteUserScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'DeleteUserScreen'
>;

type DeleteUserScreenProps = {
  navigation: DeleteUserScreenNavigationProp;
};

const DeleteUserScreen: React.FC<DeleteUserScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState<'delete' | 'problem'>(
    'delete',
  );

  return (
    <View style={[styles.screenContainer, {flexDirection: 'column'}]}>
      <HeaderView navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 20,
        }}>
        <TabButton
          title="Radering"
          selectedTab={selectedTab}
          id="delete"
          onPress={() => setSelectedTab('delete')}
        />
        <TabButton
          title="Problem"
          selectedTab={selectedTab}
          id="problem"
          onPress={() => setSelectedTab('problem')}
        />
      </View>
      <View style={styles.textContainer}>
        <MainText
          title={
            selectedTab === 'delete'
              ? 'Begäran om konto-radering'
              : 'Användarsupport'
          }
          style={{
            fontSize: 22,
            color: 'black',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <IssueView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
});

export default DeleteUserScreen;
