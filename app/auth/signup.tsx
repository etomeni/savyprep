import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import AppText from '@/components/custom/AppText';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppInputField from '@/components/form/AppInputField';
import ApiResponse from '@/components/form/ApiResponse';
import AppButton from '@/components/form/AppButton';
import { kolors } from '@/constants/Colors';
import { defaultApiResponse, passwordRegex } from '@/util/resources';
import { getUserLocation } from '@/util/location';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';


const formSchema = yup.object({
	fullName: yup.string().required().min(2).trim().label("Full Name"),

	email: yup.string().required()
		.email("Please enter a valid email address.")
		.matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
			, "Please enter a valid email address.")
		.trim().label("Email address"),


	password: yup.string().required()
		.min(6, 'Password must be at least 6 characters')
		.matches(passwordRegex,
			// /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
			'Password must include uppercase, lowercase, digit, and special character'
		).label("Password"),

	confirmPassword: yup.string().required()
		.min(6, 'Confirm Password must be at least 6 characters')
		.matches(passwordRegex,
			// /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
			'Password must include uppercase, lowercase, digit, and special character'
		).label("Password"),
});

const SignupPage = () => {
	const [seePassword, setSeePassword] = useState(true);
	const [isChecked, setChecked] = useState(false);

	const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	const _loginUser = useUserStore((state) => state._loginUser);
	const _setAppLoading = useSettingStore((state) => state._setAppLoading);

	const {
		control, handleSubmit, formState: { errors, isValid, isSubmitting }
	} = useForm({ resolver: yupResolver(formSchema), mode: 'onChange' });


	const onSubmit = async (formData: typeof formSchema.__outputType) => {
		// Simulate form submission
		// console.log('Submitted Data:', formData);

		setApiResponse(defaultApiResponse);

		if (!isChecked) {
			setApiResponse({
				display: true,
				status: false,
				message: "Please accept the terms and conditions."
			});
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setApiResponse({
				display: true,
				status: false,
				message: "Passwords do not match."
			});
			return;
		}

		_setAppLoading({ display: true });

		try {
			const location = await getUserLocation();

			const response = (await apiClient.post(`/auth/signup`, {
				...formData, location
			})).data;
			// console.log(response);

			const access_token = response.result.access_token;
			const refresh_token = response.result.refresh_token;
			const user = response.result.user;

			setApiResponse({
				display: true,
				status: true,
				message: response.message
			});
			_setAppLoading({ display: true, success: true });

			_loginUser(user, access_token, refresh_token);
			// router.replace(`/auth/VerifyEmail?`, {});
			router.replace("/account");

		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			_setAppLoading({ display: false });
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
				<View style={styles.viewContainer}>
					{/* <View style={[styles.imgContainer, { marginBottom: 15 }]}>
						<Image
							style={{
								width: 100,
								height: 100
							}}
							source={require('@/assets/images/savyPrep.png')}
						/>
					</View> */}

					<AppText style={styles.title}>Create an Account!</AppText>

					<AppText style={styles.subTitle}>Sign up to start your preparation journey</AppText>


					<View style={styles.inputContainer}>
						<AppText style={styles.inputLabel}>
							<AppText>Full Name</AppText>
							<AppText style={{ color: kolors.theme.primary }}> *</AppText>
						</AppText>

						<AppInputField
							control={control}
							name='fullName'
							errorz={errors}
							defaultValue=''

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
							defaultValue=''

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

					<View style={[styles.inputContainer, { marginTop: 20 }]}>
						<AppText style={styles.inputLabel}>
							<AppText>Password</AppText>
							<AppText style={{ color: kolors.theme.primary }}> *</AppText>
						</AppText>

						<AppInputField
							control={control}
							name='password'
							errorz={errors}
							defaultValue=''

							endIcon={seePassword ? "eye-off" : "eye"}
							onPressEndIcon={() => setSeePassword(!seePassword)}

							selectionColor={kolors.theme.secondry}
							placeholder="Create a password"
							placeholderTextColor={'gray'}
							// keyboardType="default"
							textContentType='password'
							returnKeyType="next"
							inputMode="text"
							// secureTextEntry={true}
							secureTextEntry={seePassword}
							enterKeyHint="send"
							textInputBgColor='#fff'
						/>
					</View>

					<View style={[styles.inputContainer, { marginTop: 20 }]}>
						<AppText style={styles.inputLabel}>
							<AppText>Confirm Password</AppText>
							<AppText style={{ color: kolors.theme.primary }}> *</AppText>
						</AppText>

						<AppInputField
							control={control}
							name='confirmPassword'
							errorz={errors}
							defaultValue=''

							endIcon={seePassword ? "eye-off" : "eye"}
							onPressEndIcon={() => setSeePassword(!seePassword)}

							selectionColor={kolors.theme.secondry}
							placeholder="Confirm your password"
							placeholderTextColor={'gray'}
							// keyboardType="default"
							textContentType='password'
							returnKeyType="next"
							inputMode="text"
							// secureTextEntry={true}
							secureTextEntry={seePassword}
							enterKeyHint="send"
							textInputBgColor='#fff'
						/>
					</View>

					<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
						<Checkbox
							value={isChecked}
							onValueChange={setChecked}
							// style={{margin: 8}}
							color={isChecked ? kolors.theme.primary : undefined}
						/>
						<AppText style={{ fontSize: 14 }}>I agree to the Terms of Service and Privacy Policy</AppText>
					</View>


					<ApiResponse
						display={apiResponse.display}
						status={apiResponse.status}
						message={apiResponse.message}
					/>

					<View style={{ marginTop: 20, width: "100%" }}>
						<AppButton
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isSubmitting}
							loadingIndicator={isSubmitting}
							text='Sign Up'
							textColor='#fff'
							// btnWidth={"100%"}
							fullWidth={true}
							btnTextTransform='none'
						/>
					</View>

					<View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 5 }}>
						<AppText>Already have an account?</AppText>

						<Link href="/auth/login" asChild>
							<Pressable>
								<AppText style={{ color: kolors.theme.primary }}> Login</AppText>
							</Pressable>
						</Link>
					</View>
				</View>
			</AppScrollView>
		</AppSafeAreaView>
	)
}

export default SignupPage;

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		// height: "100%",
		width: "100%",
		maxWidth: 448,
		// padding: 15,
		marginHorizontal: "auto",
		marginVertical: "auto",

		// // backgroundColor: kolors.theme.secondry,
		// backgroundColor: "#eef8fc",
		// borderRadius: 10,


		// // Box shadow for iOS
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.2,
		// shadowRadius: 4,
		// // Box shadow for Android
		// elevation: 5,
	},
	imgContainer: {
		borderRadius: 16,
		overflow: "hidden",
		// backgroundColor: kolors.theme.light,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: 'bold',
		// marginBottom: 25
	},
	subTitle: {
		textAlign: "center",
		fontSize: 13,
		fontWeight: '500',
		marginBottom: 25
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

	btnContainer: {
		backgroundColor: kolors.theme.primary,
		borderRadius: 10,
	},
	btnText: {
		color: "#fff",
		textAlign: "center",
		padding: 15,
		textTransform: "uppercase"
	},
	errorText: {
		color: kolors.theme.error
	},
	input: {
		flexGrow: 1,
		width: "100%",
		borderWidth: 0.4,
		borderRadius: 5,
		fontSize: 16,
		padding: 15,
		// textAlignVertical: 'top'
	},

});