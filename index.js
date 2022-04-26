import React from 'react';
import { AppRegistry } from 'react-native';
import Hem from './src/components/Hem';
import Elev from './src/components/Elev';
import Kurator from './src/components/Kurator';
import Chatt from './src/components/Chatt';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

const App = () => {
    const CustomTextProps = {
        fontFamily: 'NunitoSans-Light',
        color: 'black'
    }
    const CustomTextInputProps = {
        fontFamily: 'NunitoSans-Light',
        color: 'black'
    }
    return (
        <SafeAreaProvider>
            <NavigationContainer>
            
                <Stack.Navigator 
                initialRouteName='Hem'
                screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Hem' component={Hem} />
                    <Stack.Screen name='Elev' component={Elev} />
                    <Stack.Screen name='Kurator' component={Kurator} />
                    <Stack.Screen name='Chatt' component={Chatt} />

                </Stack.Navigator>

            </NavigationContainer>
        </SafeAreaProvider>
    );
};

AppRegistry.registerComponent('OmniTalk', () => App);
