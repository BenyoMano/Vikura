import React from 'react';
import {StatusBar} from 'react-native';
import HomeScreen from './src/components/Login/HomeScreen';
import NewClientScreen from './src/components/NewDetails/NewClientScreen';
import KuratorScreen from './src/components/KuratorOffice/Chat/KuratorScreen';
import ManageUserScreen from './src/components/KuratorOffice/ManageUserScreen';
import NewKuratorScreen from './src/components/NewDetails/NewKuratorScreen';
import ChatScreen from './src/components/ChatRoom/ChatScreen';
import ReportConcernScreen from './src/components/ReportConcern/ReportConcernScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddUserScreen from './src/components/AddUser/AddUserScreen';
import FlashMessage from 'react-native-flash-message';
import {IsCurrentUserKuratorProvider} from './src/firebase/isCurrentUserKuratorContext';
import UserSettingsScreen from './src/components/UserSettings/Menu/UserSettingsScreen';
import EulaAndPolicyScreen, {
  EAPSettingsChoice,
} from './src/components/UserSettings/Screens/EulaAndPolicy/EulaAndPolicyScreen';
import HelpcenterScreen, {
  HCSettingsChoice,
} from './src/components/UserSettings/Screens/Helpcenter/HelpcenterScreen';
import ChangeAliasPasswordScreen from './src/components/UserSettings/Screens/ChangeAliasPassword/ChangeAliasPasswordScreen';
import RequestDeleteScreen from './src/components/UserSettings/Screens/RequestDelete/RequestDeleteScreen';

export type StackParamList = {
  HomeScreen: any;
  NewClientScreen: any;
  KuratorScreen: any;
  NewKuratorScreen: any;
  ChatScreen: {id: string};
  AddUserScreen: any;
  ReportConcernScreen: {clientUserId: string};
  ManageUserScreen: any;
  UserSettingsScreen: any;
  EulaAndPolicyScreen: {settingsChoice: EAPSettingsChoice};
  HelpcenterScreen: {settingsChoice: HCSettingsChoice};
  ChangeAliasPasswordScreen: any;
  RequestDeleteScreen: any;
};

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <IsCurrentUserKuratorProvider>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="KuratorScreen" component={KuratorScreen} />
            <Stack.Screen
              name="ManageUserScreen"
              component={ManageUserScreen}
            />
            <Stack.Screen name="NewClientScreen" component={NewClientScreen} />
            <Stack.Screen
              name="NewKuratorScreen"
              component={NewKuratorScreen}
            />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
            <Stack.Screen
              name="ReportConcernScreen"
              component={ReportConcernScreen}
            />
            <Stack.Screen
              name="UserSettingsScreen"
              component={UserSettingsScreen}
            />
            <Stack.Screen
              name="EulaAndPolicyScreen"
              component={EulaAndPolicyScreen}
            />
            <Stack.Screen
              name="HelpcenterScreen"
              component={HelpcenterScreen}
            />
            <Stack.Screen
              name="ChangeAliasPasswordScreen"
              component={ChangeAliasPasswordScreen}
            />
            <Stack.Screen
              name="RequestDeleteScreen"
              component={RequestDeleteScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" floating={true} />
      </SafeAreaProvider>
    </IsCurrentUserKuratorProvider>
  );
};

export default App;
