import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Stack_navigation from './src/routes/Stack_navigation';
import codePush from 'react-native-code-push';
import ContextApi from './src/helper/context/ContextPage';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };


const App = () => {
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }, [])
  return (
    <ContextApi >
      <Stack_navigation />
    </ContextApi>
  );
};

export default codePush(codePushOptions)(App);
