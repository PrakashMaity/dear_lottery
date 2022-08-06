/**
 * @format
 */
 import React, { useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/helper/notification/PushNotification';

const MainApp=()=>{

    useEffect(() => {
        requestUserPermission();
      }, [])
    
    
    
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });

    return <App/>
}

AppRegistry.registerComponent(appName, () => MainApp);
