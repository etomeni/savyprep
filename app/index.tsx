import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
// import { router } from 'expo-router';
// import { getLocalStorage } from '@/util/storage';
import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
// import { reValidateUserAuth } from '@/util/resources';
import { useAuthHook } from '@/hooks/useAuthHook';
import AppText from '@/components/custom/AppText';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';

export default function index() {
	const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
	// const _setAppLoading = useSettingStore((state) => state._setAppLoading);
	const _restoreSettings = useSettingStore((state) => state._restoreSettings);

	const { reAuthUser } = useAuthHook();

	useEffect(() => {
		handleGetAppState();
	}, []);

	const handleGetAppState = async () => {
		_restoreSettings();
		_handleRestoreUser();
		
		const userAuthState = await reAuthUser();
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