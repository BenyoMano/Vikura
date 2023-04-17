/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AppRegistry, Platform, StatusBar} from 'react-native';
import Home from './src/components/Login/Home';
import NewClient from './src/components/NewDetails/NewClient';
import KuratorView from './src/components/KuratorOffice/KuratorView';
import NewKurator from './src/components/NewDetails/NewKurator';
import ChatView from './src/components/ChatRoom/ChatView';
import ReportConcern from './src/components/ReportConcern/ReportConcernView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddUserView from './src/components/AddUser/AddUserView';
import FlashMessage from 'react-native-flash-message';
import {IsKuratorProvider} from './src/firebase/isKuratorContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <IsKuratorProvider>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NewClient" component={NewClient} />
            <Stack.Screen name="KuratorView" component={KuratorView} />
            <Stack.Screen name="NewKurator" component={NewKurator} />
            <Stack.Screen name="ChatView" component={ChatView} />
            <Stack.Screen name="AddUserView" component={AddUserView} />
            <Stack.Screen name="ReportConcern" component={ReportConcern} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage
          position="top"
          floating={Platform.OS === 'ios' ? true : false}
        />
      </SafeAreaProvider>
    </IsKuratorProvider>
  );
};

AppRegistry.registerComponent('Omnitalk', () => App);
