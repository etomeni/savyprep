import { useEffect, useRef } from 'react';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';
import LoadingModal from '@/components/custom/LoadingModal';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';
import { 
	handleNotificationReceivedListener, handleNotificationResponseReceivedListener 
} from '@/util/PushNotifications';


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const settings = useSettingStore((state) => state.settings);

	// const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const notificationListener = useRef<Notifications.EventSubscription>();
	const responseListener = useRef<Notifications.EventSubscription>();

	useEffect(() => {
		// registerForPushNotificationsAsync()
		// 	.then(token => setExpoPushToken(token ?? ''))
		// 	.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			handleNotificationReceivedListener(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			handleNotificationResponseReceivedListener(response);
			// console.log(response);
		});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(notificationListener.current);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);	

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		<ThemeProvider value={DefaultTheme}>
			<Stack 
				screenOptions={{
					// statusBarColor: Colors.theme.primary
					statusBarBackgroundColor: kolors.theme.primary
				}}
			>
				{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
				<Stack.Screen name="index" options={{ headerShown: false }} />

				<Stack.Screen name="auth" options={{ headerShown: false }} />
				<Stack.Screen name="Onboarading" options={{ headerShown: false }} />
				<Stack.Screen name="account" options={{ headerShown: false }} />

				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />

			            
			{ settings.appLoading.display && 
				<LoadingModal 
					display={settings.appLoading.display} 
					success={settings.appLoading.success} 
					overlayBgColor={settings.appLoading.overlayBgColor}
				/>
			}
		</ThemeProvider>
	);
}
