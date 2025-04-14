import React, { useEffect } from 'react';
import { Alert, AlertButton, Linking, StyleSheet, View } from 'react-native';
// import { router } from 'expo-router';
// import { getLocalStorage } from '@/util/storage';
import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
// import { reValidateUserAuth } from '@/util/resources';
import { useAuthHook } from '@/hooks/useAuthHook';
import AppText from '@/components/custom/AppText';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';


const APP_VERSION = "1.3.0";
const APP_ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=com.savyprep.app";
const APP_ANDROID_WEB_ACCESS_URL = "https://play.google.com/apps/testing/com.savyprep.app";



export default function index() {
	const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
	// const _setAppLoading = useSettingStore((state) => state._setAppLoading);
	const _restoreSettings = useSettingStore((state) => state._restoreSettings);
	const { reAuthUser, checkAppVersionUpdates } = useAuthHook();



	useEffect(() => {
		handleGetAppState();
	}, []);


    const openAppLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

	const handleGetAppState = async () => {
		_restoreSettings();
		_handleRestoreUser();
		
		const userAuthState = await reAuthUser();

		const versionStatus = await checkAppVersionUpdates(APP_VERSION);
		if (versionStatus.forceUpdate || versionStatus.newUpdate) {
			const closeBtn: AlertButton = {text: 'Cancel', onPress: () => {}, style: "cancel"}

			Alert.alert(
				'App Update',
				"A new app update is available with exciting features and important fixes. Update now to enjoy an even better experience!",
				[
					// {
					// 	text: 'Cancel',
					// 	onPress: () => {},
					// 	style: 'cancel',
					// },
					...(!versionStatus.forceUpdate ? [closeBtn] : []),
					{
						text: 'Update',
						onPress: () => {
							openAppLink(APP_ANDROID_STORE_URL)
						},
						style: 'default',
					},
				],
				{
					cancelable: !versionStatus.forceUpdate,
					// onDismiss: () =>
					// 	Alert.alert(
					// 		'This alert was dismissed by tapping outside of the alert dialog.',
					// 	),
				},
			);			
		}
	}


	return (
        <AppSafeAreaView>
			<View>
				{/* <AppText>Loading...</AppText> */}

			</View>
		</AppSafeAreaView>
	)
}

const styles = StyleSheet.create({})