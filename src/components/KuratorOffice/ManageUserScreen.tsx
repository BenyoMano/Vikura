import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {HeaderView} from '../Header/HeaderView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../App';
import MainText from '../../atoms/MainText';
import TabButton from '../../atoms/TabButton';
import ManageView from './ManageView';
import {useIndicator} from './useIndicator';

type ManageUserScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ManageUserScreen'
>;

type ManageUserScreenProps = {
  navigation: ManageUserScreenNavigationProp;
};

export type SelectedTab = 'delete' | 'problem' | 'feedback';

const ManageUserScreen: React.FC<ManageUserScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('delete');
  const {deleteIndicator, problemIndicator, feedbackIndicator} = useIndicator();

  return (
    <View style={[styles.screenContainer, {flexDirection: 'column'}]}>
      <HeaderView navigation={navigation} />
      <View style={styles.tabStyle}>
        <TabButton
          title="Radering"
          selectedTab={selectedTab}
          id="delete"
          deleteIndicator={deleteIndicator}
          onPress={() => setSelectedTab('delete')}
        />
        <TabButton
          title="Problem"
          selectedTab={selectedTab}
          id="problem"
          problemIndicator={problemIndicator}
          onPress={() => setSelectedTab('problem')}
        />
        <TabButton
          title="Feedback"
          selectedTab={selectedTab}
          id="feedback"
          feedbackIndicator={feedbackIndicator}
          onPress={() => setSelectedTab('feedback')}
        />
      </View>
      <View style={styles.textContainer}>
        <MainText
          title={
            selectedTab === 'delete'
              ? 'Begäran om konto-radering'
              : selectedTab === 'problem'
              ? 'Användarsupport'
              : selectedTab === 'feedback'
              ? 'Synpunkter'
              : ''
          }
          style={{
            fontSize: 22,
            color: 'black',
          }}
        />
      </View>
      <View style={styles.deleteStyle}>
        <ManageView selectedTab={selectedTab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  } as ViewStyle,
  tabStyle: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  } as ViewStyle,
  textContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  } as ViewStyle,
  deleteStyle: {
    flex: 1,
    width: '88%',
  } as ViewStyle,
});

export default ManageUserScreen;
