import React from 'react';
import {AppRegistry} from 'react-native';
import Hem from './src/components/Hem';
import Elev from './src/components/Elev';
import Kurator from './src/components/Kurator';
import NewKurator from './src/components/NewKurator';
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
          <Stack.Screen name="Elev" component={Elev} />
          <Stack.Screen name="Kurator" component={Kurator} />
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
