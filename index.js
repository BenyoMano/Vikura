import {AppRegistry} from 'react-native';
import App from './App';
// import {StatusBar} from 'react-native';
// import React from 'react';
// import HomeScreen from './src/components/Login/HomeScreen';
// import NewClientScreen from './src/components/NewDetails/NewClientScreen';
// import KuratorScreen from './src/components/KuratorOffice/KuratorScreen';
// import NewKuratorScreen from './src/components/NewDetails/NewKuratorScreen';
// import ChatScreen from './src/components/ChatRoom/ChatScreen';
// import ReportConcernScreen from './src/components/ReportConcern/ReportConcernScreen';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import AddUserScreen from './src/components/AddUser/AddUserScreen';
// import FlashMessage from 'react-native-flash-message';
// import {IsCurrentUserKuratorProvider} from './src/firebase/isCurrentUserKuratorContext';

// export type StackParamList = {
//   HomeScreen: any;
//   NewClientScreen: any;
//   KuratorScreen: any;
//   NewKuratorScreen: any;
//   ChatScreen: {id: string};
//   AddUserScreen: any;
//   ReportConcernScreen: {clientUserId: string};
// };

// const Stack = createNativeStackNavigator<StackParamList>();

// const App = () => {
//   return (
//     <IsCurrentUserKuratorProvider>
//       <SafeAreaProvider>
//         <StatusBar
//           translucent
//           backgroundColor="transparent"
//           barStyle={'dark-content'}
//         />
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName="HomeScreen"
//             screenOptions={{headerShown: false}}>
//             <Stack.Screen name="HomeScreen" component={HomeScreen} />
//             <Stack.Screen name="KuratorScreen" component={KuratorScreen} />
//             <Stack.Screen name="NewClientScreen" component={NewClientScreen} />
//             <Stack.Screen
//               name="NewKuratorScreen"
//               component={NewKuratorScreen}
//             />
//             <Stack.Screen name="ChatScreen" component={ChatScreen} />
//             <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
//             <Stack.Screen
//               name="ReportConcernScreen"
//               component={ReportConcernScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//         <FlashMessage position="top" floating={true} />
//       </SafeAreaProvider>
//     </IsCurrentUserKuratorProvider>
//   );
// };

AppRegistry.registerComponent('Omnitalk', () => App);
