import React from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, Pressable, Alert } from 'react-native';
import { kolors } from '@/constants/Colors';
// import ListItemComponent from '@/components/ListItemComponent';
import { router } from 'expo-router';
// import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
// import { useAccountStore } from '@/state/accountStore';
// import UserProfileImage from '@/components/UserProfileImage';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import UserProfileImage from '@/components/custom/UserProfileImage';
import AppText from '@/components/custom/AppText';
import ListItemComponent from '@/components/custom/ListItemComponent';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


export default function Profile() {
	// const appTheme = useSettingStore((state) => state.theme);
	const _logOutUser = useUserStore((state) => state._logOutUser);
	const userData = useUserStore((state) => state.userData);
	// const accessToken = useUserStore((state) => state.accessToken);

	const handleDeleteAccount = async () => {
        try {
            const response = (await apiClient.delete(`/auth/delete-account`)).data;
            // console.log(response);
			_logOutUser();
        } catch (error: any) {
            const errorMessage = apiErrorResponse(error, "Oooops, something went wrong", false);
        }
	}

	const showDeleteAccountAlert = () => {
		// console.log("hello");
		Alert.alert(
			'Are you sure you want to delete this account?',
			'Permanently delete your account and all data. \nThis action is not reversible',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Delete Account',
					onPress: () => {
						handleDeleteAccount();
					},
					style: 'destructive',
				},
			],
			{
				cancelable: true,
				// onDismiss: () =>
				// 	Alert.alert(
				// 		'This alert was dismissed by tapping outside of the alert dialog.',
				// 	),
			},
		);
	}

	return (
		<AppSafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false} >
				<ImageBackground
					source={require('@/assets/images/walletHeader.png')}
					style={styles.imageBackground}
					resizeMode='cover'
				>
					<View style={styles.overlay}>
						{/* <View style={{alignSelf: "flex-start"}}>
                            <IconComponent
                                iconName='arrow-back' 
                                iconColor='#fff'
                                iconBgColor='#FCFCFC80'
                                iconSize={30}
                            />
                        </View> */}

						<Pressable
							onPress={() => router.push("/account")}
							style={{ alignItems: "center" }}
						>
							<UserProfileImage size={55} fullName={userData.fullName} />

							<View
								style={{
									// justifyContent: "center",
									// alignItems: "center",
									// flexDirection: "row"
									marginVertical: 5
								}}
							>
								<AppText style={{
									color: "#fff",
									fontSize: 18,
									fontWeight: "600",
									textAlign: "center"
								}}>{userData.fullName}</AppText>

								<AppText style={{
									color: "#dfdfdf",
									fontSize: 16,
									fontWeight: "400",
									textAlign: "center",
									marginBottom: 5
								}}>{userData.plan} plan</AppText>

							</View>
						</Pressable>
					</View>
				</ImageBackground>

				<View style={{ padding: 15 }}>

					{/* {profileMenu.map((menu, index) => (
                        <ListItemComponent
                            key={index}
                            iconName={menu.iconName || "apps"}
                            itemTitle={menu.itemTitle}
                            itemSubTitle={menu.itemSubTitle}
                            itemTitleColor={menu.itemTitleColor}
                        />
                    ))} */}


					<Pressable onPress={() => router.push("/account/ProfileInformation")}>
						<ListItemComponent
							iconName='person-outline'
							itemTitle='Profile '
							itemSubTitle='Personal Information'
						/>
					</Pressable>

					<Pressable onPress={() => router.push("/account/Subscription")}>
						<ListItemComponent
							iconName='speedometer-outline'
							itemTitle='Subscription '
							itemSubTitle='Manage your subscription plan and billing.'
						/>
					</Pressable>

					<Pressable onPress={() => router.push("/account/FAQ")}>
						<ListItemComponent
							iconName='help-circle-outline'
							itemTitle='Frequently Asked Questions '
							itemSubTitle=''
						/>
					</Pressable>

					<Pressable onPress={() => router.push("/account/ContactUs")}>
						<ListItemComponent
							iconName='chatbox-ellipses-outline'
							itemTitle='Chat Us'
						/>
					</Pressable>


					{/* <ListItemComponent
						iconName='document-text-outline'
						itemTitle='Terms & Conditions'
						itemSubTitle='View our terms and conditions'
					/> */}

					{/* <Pressable onPress={() => router.push("/account") }>
                        <ListItemComponent
                            // iconName='lock-closed-outline'
                            iconName='settings-outline'
                            itemTitle='Settings'
                        />
                    </Pressable> */}

					<Pressable onPress={() => _logOutUser()}>
						<ListItemComponent
							iconName='log-out-outline'
							itemTitle='Log Out'
							itemSubTitle='Sign out from this device'
						/>
					</Pressable>

					<Pressable onPress={() => showDeleteAccountAlert()}>
						<ListItemComponent
							iconName='trash-outline'
							itemTitle='Delete Account'
							itemSubTitle='This action is not reversible'
							itemTitleColor='#de2341'
							iconColor='#de2341'
						/>
					</Pressable>
				</View>
			</ScrollView>
		</AppSafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageBackground: {
		// flex: 0.45, // Take 25% of the screen height
		// flex: 1,
		width: '100%',
		height: 200,
		justifyContent: 'center', // Center vertically
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: `${kolors.theme.secondry}e5`, // '#DE2341E5', // Adjust the opacity as needed
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		padding: 15
	},
});