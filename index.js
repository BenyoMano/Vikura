/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AppRegistry, Platform, StatusBar} from 'react-native';
import HomeScreen from './src/components/Login/HomeScreen';
import NewClientScreen from './src/components/NewDetails/NewClientScreen';
import KuratorScreen from './src/components/KuratorOffice/KuratorScreen';
import NewKuratorScreen from './src/components/NewDetails/NewKuratorScreen';
import ChatScreen from './src/components/ChatRoom/ChatScreen';
import ReportConcernScreen from './src/components/ReportConcern/ReportConcernScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddUserScreen from './src/components/AddUser/AddUserScreen';
import FlashMessage from 'react-native-flash-message';
import {IsCurrentUserKuratorProvider} from './src/firebase/isCurrentUserKuratorContext';

const Stack = createNativeStackNavigator();

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
            <Stack.Screen name="NewClientScreen" component={NewClientScreen} />
            <Stack.Screen name="KuratorScreen" component={KuratorScreen} />
            <Stack.Screen name="NewKuratorScreen" component={NewKuratorScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
            <Stack.Screen name="ReportConcernScreen" component={ReportConcernScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage
          position="top"
          floating={Platform.OS === 'ios' ? true : false}
        />
      </SafeAreaProvider>
    </IsCurrentUserKuratorProvider>
  );
};

AppRegistry.registerComponent('Omnitalk', () => App);
