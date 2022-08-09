import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOrSignUp from '../pages/auth_Container/LoginOrSignUp';
import Login from '../pages/auth_Container/Login';
import Signup from '../pages/auth_Container/Signup';
import Tab_navigation from './Tab_navigation';
import AllTickets_Page from '../pages/main_Container/home/AllTickets_Page';
import { getAsync } from '../helper/asyncstorage/AsyncStoragePage';
import IntroPage from '../pages/intro_Container/IntroPage';
import Result from '../pages/main_Container/home/Result';
export default function Stack_navigation() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState("");


    const Stack = createNativeStackNavigator();
    const checkisLogin = async () => {
        setIsLoading(true)
        const res = await getAsync('isLogin')
        // console.log("res-----", res)
        setIsLogin(res)
        setIsLoading(false)
    }

    useEffect(() => {
        checkisLogin()
    }, [])

    // console.log(isLogin, typeof (isLogin))

    return (
        
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='IntroPage' component={IntroPage} />
                <Stack.Screen name='LoginOrSignUp' component={LoginOrSignUp} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='tabBar' component={Tab_navigation} />
                <Stack.Screen name='AllTickets_Page' component={AllTickets_Page} />
                <Stack.Screen name='Result' component={Result} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}