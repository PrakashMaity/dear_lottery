import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOrSignUp from '../pages/auth_Container/LoginOrSignUp';
import Login from '../pages/auth_Container/Login';
import Signup from '../pages/auth_Container/Signup';
import Tab_navigation from './Tab_navigation';
import AllTickets_Page from '../pages/main_Container/home/AllTickets_Page';
export default function Stack_navigation() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='LoginOrSignUp' component={LoginOrSignUp} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='tabBar' component={Tab_navigation} />
                <Stack.Screen name='AllTickets_Page' component={AllTickets_Page} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}