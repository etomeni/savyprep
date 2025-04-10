import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppText from '@/components/custom/AppText';
import AppInputField from '@/components/form/AppInputField';
import ApiResponse from '@/components/form/ApiResponse';
import AppButton from '@/components/form/AppButton';

import { defaultApiResponse, passwordRegex } from '@/util/resources';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';


const formSchema = yup.object({
	// emailPhoneNum: yup.string().required().trim().label("Email or phone number"),
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
});

const Login = () => {
	const [seePassword, setSeePassword] = useState(true);
	const [isChecked, setChecked] = useState(false);

	const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	const _loginUser = useUserStore((state) => state._loginUser);
	const _setAppLoading = useSettingStore((state) => state._setAppLoading);

	const {
		control, handleSubmit, formState: { errors, isValid, isSubmitting }
	} = useForm({ resolver: yupResolver(formSchema), mode: 'onChange', });


	const onSubmit = async (formData: typeof formSchema.__outputType) => {
		// Simulate form submission
		// console.log('Submitted Data:', formData);

		setApiResponse(defaultApiResponse);
		_setAppLoading({ display: true });
		
		try {
			const response = (await apiClient.post(`/auth/login`, formData)).data;
			// console.log(response);

			const access_token = response.result.access_token;
			const refresh_token = response.result.refresh_token;
			const user = response.result.user;

			// setApiResponse({
			// 	display: true,
			// 	status: true,
			// 	message: response.message
			// });
			_setAppLoading({ display: true, success: true });

			_loginUser(user, access_token, refresh_token);
			router.replace("/account");

		} catch (error: any) {
			//   console.log(error);
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
					<View style={[styles.imgContainer, { marginBottom: 15 }]}>
						<Image
							style={{
								width: 100,
								height: 100
							}}
							source={require('@/assets/images/savyPrep.png')}
						/>
					</View>

					<AppText style={styles.title}>Welcome Back!</AppText>

					<AppText style={styles.subTitle}>Log in to continue your preparation journey</AppText>


					<View style={styles.inputContainer}>
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
							placeholder="***************"
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

					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%" }}>
						<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
							<Checkbox
								value={isChecked}
								onValueChange={setChecked}
								// style={{margin: 8}}
								color={isChecked ? kolors.theme.primary : undefined}
							/>
							<AppText style={{ fontSize: 14 }}>Remember me</AppText>
						</View>


						<Link href="/auth/ForgetPassword" asChild style={{ marginVertical: 10, alignItems: 'flex-start' }} >
							<Pressable>
								<AppText style={{ color: kolors.theme.primary }}>Forgotten password?</AppText>
							</Pressable>
						</Link>
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
							text='Login'
							textColor='#fff'
							btnWidth={"100%"}
							btnTextTransform='none'
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<AppText style={{ textAlign: "center" }}>
							Don't have an account?
							<AppText>
								<Link href="/auth/signup" asChild>
									<Pressable>
										<AppText style={{ color: kolors.theme.primary }}> Sign up</AppText>
									</Pressable>
								</Link>
							</AppText>
						</AppText>
					</View>
				</View>
			</AppScrollView>
		</AppSafeAreaView>
	)
}

export default Login;

const styles = StyleSheet.create({
	viewContainer: {
		// flex: 1,
		// flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		// height: "100%",
		width: "100%",
		maxWidth: 448,
		padding: 15,
		marginHorizontal: "auto",
		marginVertical: "auto",
		// backgroundColor: kolors.theme.secondry,
		backgroundColor: "#eef8fc",
		borderRadius: 10,


		// Box shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,

		// Box shadow for Android
		elevation: 5,
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