import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';
import LoadingModal from '@/components/custom/LoadingModal';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const settings = useSettingStore((state) => state.settings);

	// const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

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
				<Stack.Screen name="Onboarading" options={{ presentation: 'modal' }} />
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
