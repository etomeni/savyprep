import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: true,
//     }),
// });


// export type messageInterface<T extends object> = {
export type messageInterface<T> = {
    to: string[] | string;
    sound?: string | null; // iOS Only:: Play a sound when the recipient receives this notification. Specify default to play the device's default notification sound, or omit this field to play no sound. Custom sounds need to be configured via the config plugin and then specified including the file extension.
    title: string;
    body: string;
    data: T;
    ttl?: number; // Time to Live: the number of seconds for which the message may be kept around for redelivery if it hasn't been delivered yet.
    priority?: 'default' | 'normal' | 'high'; // The delivery priority of the message. Specify default or omit this field to use the default priority on each platform ("normal" on Android and "high" on iOS).
    subtitle?: string; // iOS Only:: The subtitle to display in the notification below the title.
    badge?: number; // iOS Only:: The subtitle to display in the notification below the title.
    interruptionLevel?: 'active' | 'critical' | 'passive' | 'time-sensitive'; // iOS Only:::
    channelId?: string; // Android Only::: ID of the Notification Channel through which to display this notification. If an ID is specified but the corresponding channel does not exist on the device (that has not yet been created by your app), the notification will not be displayed to the user.
    // icon?: string; // Android Only:::
    richContent?: Object; // Android Only:: Currently supports setting a notification image (only on Android). Provide an object with key image and value of type string, which is the image URL.
    categoryId?: string; // ID of the notification category that this notification is associated with.
    // body: string;
}

export async function sendPushNotification(message: messageInterface<object>[] | messageInterface<object>) {
    // const message = {
    //     to: expoPushData.to, // expoPushToken,
    //     sound: expoPushData.sound || 'default', // 'default',
    //     title: expoPushData.title, // 'Original Title',
    //     body: expoPushData.body, // 'And here is the body!',
    //     data: expoPushData.data, // { someData: 'goes here' },
    // };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}


function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            // lightColor: '#FF231F7C', // #FF231F7C
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push push notifications!');
            return;
        }

        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            // console.log(pushTokenString);

            return pushTokenString;
        } catch (e: unknown) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device to receive push notifications');
    }
}


// Listeners registered by this method will be called whenever a notification is received while the app is running.
export function handleNotificationReceivedListener(notification: Notifications.Notification) {
    console.log(notification);
    
}

// Listeners registered by this method will be called whenever a user interacts with a notification (for example, taps on it).
export function handleNotificationResponseReceivedListener(notification: Notifications.NotificationResponse) {
    console.log(notification);
    
}
