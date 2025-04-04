import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import AppText from '@/components/custom/AppText';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import UserProfileImage from '@/components/custom/UserProfileImage';

import { useUserStore } from '@/state/userStore';
import { kolors } from '@/constants/Colors';
import { defaultApiResponse } from '@/util/resources';
import PricingScreen from '@/components/subscription/Plan';


export default function Subscription() {
	const userData = useUserStore((state) => state.userData);
	// const [apiResponse, setApiResponse] = useState(defaultApiResponse);



	return (
		<AppSafeAreaView>
			<AppScrollView>
				<Stack.Screen options={{ title: 'Oops!' }} />
				
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<AppText style={styles.headerText}
						>Subscription</AppText>

						<AppText style={styles.subheader}
						>Manage your subscription plan and billing.</AppText>

						<UserProfileImage size={80} fullName={userData.fullName} />

						<View style={{
							flexDirection: "column", alignItems: "center", justifyContent: "center",
							gap: 8
						}}>
							<AppText style={[styles.headerText, {fontSize: 15}]}
							>Demo User</AppText>

							<AppText style={{
								backgroundColor: kolors.theme.secondry,
								color: kolors.theme.primary,
								// textAlign: "center",
								paddingHorizontal: 10,
								paddingVertical: 5,
								borderRadius: 15,
							}}>free Plan</AppText>

							<AppText style={[styles.subheader, {marginBottom: 0}]}
							>Basic features for students</AppText>
						</View>
					</View>

					<View>
						<AppText style={styles.upgradeText}
						>
							<AppText style={{fontWeight: "bold"}}
							>Upgrade to unlock more features! </AppText>
							Get more practice sessions, advanced AI questions, and priority support.
						</AppText>
					</View>

					<PricingScreen />

				</View>
			</AppScrollView>
		</AppSafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",

		width: "100%",
		maxWidth: 600,
		// padding: 15,
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	headerContainer: {
		flexDirection: "column",
		gap: 10,
		marginTop: 15,
		marginBottom: 20,
	},
	// header: {
	// 	fontSize: 24,
	// 	fontWeight: 'bold',
	// 	marginBottom: 4,
	// },
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	subheader: {
		fontSize: 16,
		color: '#666',
		marginBottom: 20,
	},
	upgradeText: {
		fontSize: 16,
		color: '#666',
		marginBottom: 20,
		backgroundColor: "#f8f9fa",
		padding: 10,
		borderRadius: 10
	},


})