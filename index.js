import React, { useState } from 'react';
import {AppRegistry} from 'react-native';
import Hem from './src/components/Login/Hem';
import NewElev from './src/components/NewDetails/NewElev';
import KuratorView from './src/components/KuratorOffice/KuratorView';
import NewKurator from './src/components/NewDetails/NewKurator';
import ChatView from './src/components/ChatRoom/ChatView';
import ReportConcern from './src/components/ReportConcern/ReportConcernView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddUserView from './src/components/AddUser/AddUserView';
import FlashMessage from 'react-native-flash-message';
import { IsKuratorContext, IsKuratorProvider } from './src/firebase/isKuratorContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const CustomTextProps = {
    fontFamily: 'NunitoSans-Light',
    color: 'black',
  };
  const CustomTextInputProps = {
    fontFamily: 'NunitoSans-Light',
    color: 'black',
  };
  
  // const [isKurator, setIsKurator] = useState(undefined);

  return (
    <IsKuratorProvider>
    <SafeAreaProvider>
      
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Hem"
            screenOptions={{headerShown: false}}>
              <Stack.Screen name="Hem" component={Hem} />
              <Stack.Screen name="NewElev" component={NewElev} />
              <Stack.Screen name="KuratorView" component={KuratorView} />
              <Stack.Screen name="NewKurator" component={NewKurator} />
              <Stack.Screen name="ChatView" component={ChatView} />
              <Stack.Screen name="AddUserView" component={AddUserView} />
              <Stack.Screen name="ReportConcern" component={ReportConcern} />
          </Stack.Navigator>
        </NavigationContainer>
      <FlashMessage position='top'/>
      
    </SafeAreaProvider>
    </IsKuratorProvider>
  );
};

AppRegistry.registerComponent('Omnitalk', () => App);
