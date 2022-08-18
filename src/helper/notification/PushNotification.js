import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
    try {
        // console.log("requestUserPermission----------")
        const authStatus = await messaging().requestPermission();
        // console.log("authStatus**************",authStatus)
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            // console.log('Authorization status:', authStatus);
            GetFCMToken();
        }
    } catch (error) {
        console.log("requestUserPermission", error)
    }
}

const GetFCMToken = async () => {
    try {
        let fcmtoken = await AsyncStorage.getItem("fcmtoken")
        // console.log("old token", fcmtoken)
        if (fcmtoken === null) {
            const newFCMToken = await messaging().getToken();
            // console.log("newFCMToken..................", newFCMToken)
            if (newFCMToken) {
                // console.log("newFCMToken", newFCMToken)
                await AsyncStorage.setItem("fcmtoken", newFCMToken)
            }
        }
    } catch (error) {
        console.log("GetFCMToken", error)
    }
}

const navigate_which_page = (type, item, navigation) => {
    // 'task', 'dispute', 'message','profile'

    if (type === "task") {
        navigation.push('TaskDetails', { show: item.slug })
    } else if (type === "dispute") {
        navigation.push('DisputesDetails', { id: item.id, slug: item.slug })
    } else if (type === "message") {
        navigation.push('ChatPage', {
            show: item.slug,
        })
    } else if (type === "profile") {
        navigation.navigate("BasicInfo", { fixerOredit: "Fixer" })
    }
}

export const notificationListner = (navigation) => {
    try {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage.notification);
            console.log("remoteMessage----", remoteMessage);
        });
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification);
            }
            console.log("remoteMessage................2", remoteMessage)
            if (remoteMessage !== null) {
                console.log("remoteMessage................", remoteMessage.data.slug);
                console.log("remoteMessage................1", remoteMessage.data.type);
            }
        });
        messaging().onMessage(async remoteMessage => {
            console.log("notification when app open.....", remoteMessage)
        })
    } catch (error) {
        console.log("notificationListner.....", error)
    }
}