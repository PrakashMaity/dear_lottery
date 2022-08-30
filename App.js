import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import Stack_navigation from './src/routes/Stack_navigation';
import codePush from 'react-native-code-push';
import ContextApi from './src/helper/context/ContextPage';
import { Button, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const otaUpdateHandler = () => {
  codePush.sync({
    updateDialog: {
      appendReleaseDescription: true,
      title: 'a new update is available!',
    },

    installMode: codePush.InstallMode.IMMEDIATE,
  });
};

const NoInternetModal = ({ show, onRetry, isRetrying }) => (
  <ReactNativeModal
    isVisible={show}
    style={styles.modal}
    animationInTiming={600}
  >
    <View style={styles.modalContainer}>
      <Lottie
        style={{ width: 100 }}
        source={require('./assets/animation/noconnection.json')}
        autoPlay
        loop
      />

      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
    </View>
  </ReactNativeModal>
);

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    otaUpdateHandler();
  }, []);

  return (
    <ContextApi>
      <NoInternetModal
        show={isOffline}
        onRetry={() => {}}
        isRetrying={() => {}}
      />
      <Stack_navigation />
    </ContextApi>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default codePush(codePushOptions)(App);
