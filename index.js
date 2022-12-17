import React from 'react';
import {AppRegistry} from 'react-native';
import Hem from './src/components/Login/Hem';
import NewElev from './src/components/NewDetails/NewElev';
import KuratorView from './src/components/KuratorOffice/KuratorView';
import NewKurator from './src/components/NewDetails/NewKurator';
import ChatView from './src/components/ChatRoom/ChatView';
import AddUser from './src/components/AddUser/AddUserView';
import ReportConcern from './src/components/ReportConcern/ReportConcernView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
  return (
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
          <Stack.Screen name="AddUser" component={AddUser} />
          <Stack.Screen name="ReportConcern" component={ReportConcern} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent('OmniTalk', () => App);
