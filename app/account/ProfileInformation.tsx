import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import AppText from '@/components/custom/AppText';
import AppInputField from '@/components/form/AppInputField';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import UserProfileImage from '@/components/custom/UserProfileImage';

import { useUserStore } from '@/state/userStore';
import { kolors } from '@/constants/Colors';
import { defaultApiResponse } from '@/util/resources';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import AppButton from '@/components/form/AppButton';


const formSchema = yup.object({
	fullName: yup.string().required().min(2).trim().label("Full Name"),

	email: yup.string().required()
		.email("Please enter a valid email address.")
		.matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
			, "Please enter a valid email address.")
		.trim().label("Email address"),

});

export default function ProfileInformation() {
	const userData = useUserStore((state) => state.userData);
	const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	const {
		control, handleSubmit, formState: { errors, isValid, isSubmitting }
	} = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur' });

	
	const onSubmit = async (formData: typeof formSchema.__outputType) => {
		// Simulate form submission
		// console.log('Submitted Data:', formData);

		setApiResponse(defaultApiResponse);


		try {

			const response = (await apiClient.post(`/auth/signup`, {
				...formData, location
			})).data;
			console.log(response);

			// const access_token = response.result.access_token;
			// const refresh_token = response.result.refresh_token;
			// const user = response.result.user;

			setApiResponse({
				display: true,
				status: true,
				message: response.message
			});


		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
	};


	return (
		<AppSafeAreaView>
			<AppScrollView>

				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<AppText style={styles.headerText}
						>Personal Information</AppText>

						<AppText style={styles.subheader}
						>Update your personal details and how we can reach you.</AppText>

						<UserProfileImage size={80} fullName={userData.fullName} />

						<View style={{
							flexDirection: "column", alignItems: "center", justifyContent: "center",
							gap: 8
						}}>
							<AppText style={[styles.headerText, {fontSize: 15}]}
							>Demo User</AppText>

							<AppText style={[styles.subheader, {marginBottom: 0}]}
							>sundaywht@gmail.com</AppText>

							<AppText style={{
								backgroundColor: kolors.theme.secondry,
								color: kolors.theme.primary,
								// textAlign: "center",
								paddingHorizontal: 10,
								paddingVertical: 5,
								borderRadius: 15,
							}}>free Plan</AppText>
						</View>
					</View>

					<View>

						<View style={styles.inputContainer}>
							<AppText style={styles.inputLabel}>
								<AppText>Full Name</AppText>
								<AppText style={{ color: kolors.theme.primary }}> *</AppText>
							</AppText>

							<AppInputField
								control={control}
								name='fullName'
								errorz={errors}
								// defaultValue={userData.fullName}
								value={userData.fullName}

								selectionColor={kolors.theme.secondry}
								placeholder="Enter your full name"
								placeholderTextColor={'gray'}
								// keyboardType="email-address"
								returnKeyType="next"
								inputMode="text"
								enterKeyHint="next"
								textInputBgColor='#fff'
							/>
						</View>

						<View style={[styles.inputContainer, { marginTop: 20 }]}>
							<AppText style={styles.inputLabel}>
								<AppText>Email Address</AppText>
								<AppText style={{ color: kolors.theme.primary }}> *</AppText>
							</AppText>

							<AppInputField
								control={control}
								name='email'
								errorz={errors}
								// defaultValue=''
								value={userData.email}
								readOnly

								selectionColor={kolors.theme.secondry}
								placeholder="Enter your email address"
								placeholderTextColor={'gray'}
								keyboardType="email-address"
								returnKeyType="next"
								inputMode="email"
								enterKeyHint="next"
								textInputBgColor='#fff'
							/>
						</View>



						<View style={{ marginTop: 20, width: "100%" }}>
							<AppButton
								onPress={handleSubmit(onSubmit)}
								disabled={!isValid || isSubmitting}
								loadingIndicator={isSubmitting}
								text='Update Profile'
								textColor='#fff'
								btnWidth={"100%"}
								btnTextTransform='none'
							/>
						</View>
					</View>
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

	inputLabel: {
		// padding: 10,
		fontSize: 15,
		flexGrow: 1,
		paddingHorizontal: 0
	},
	inputContainer: {
		width: '100%',
	},
	inputError: {
		borderColor: kolors.theme.error
	},
})