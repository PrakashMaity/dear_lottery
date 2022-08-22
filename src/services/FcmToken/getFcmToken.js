import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmtoken');
  if (fcmToken != null) {
    return fcmToken;
  } else {
    const newFCMToken = await messaging().getToken();
    await AsyncStorage.setItem('fcmtoken', newFCMToken);
    return newFCMToken;
  }
};
