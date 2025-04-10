import React, { useState } from 'react';
// import axios from 'axios';

import { kolors } from '@/constants/Colors';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Link, router, useLocalSearchParams } from 'expo-router';
// import AppSafeAreaView from '@/components/AppSafeAreaView';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { defaultApiResponse, passwordRegex } from '@/util/resources';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppText from '@/components/custom/AppText';
import AppInputField from '@/components/form/AppInputField';
import ApiResponse from '@/components/form/ApiResponse';
import AppButton from '@/components/form/AppButton';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


const formSchema = yup.object({
	password: yup.string().required()
		.min(6, 'Password must be at least 6 characters')
		.matches(passwordRegex,
			// /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
			'Password must include uppercase, lowercase, digit, and special character'
		).label("Password"),

	confirmPassword: yup.string().required()
		.min(6, 'Password must be at least 6 characters')
		.matches(passwordRegex,
			// /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
			'Password must include uppercase, lowercase, digit, and special character'
		).label("Password"),
});

const SignupPage = () => {
	const { email, token } = useLocalSearchParams();
	
	const [seePassword, setSeePassword] = useState(true);
	const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	const {
		control, handleSubmit, formState: { errors, isValid, isSubmitting }
	} = useForm({ resolver: yupResolver(formSchema), mode: 'onChange' });


	const onSubmit = async (formData: typeof formSchema.__outputType) => {
		setApiResponse(defaultApiResponse);

		try {
			const response = (await apiClient.post(`/auth/setNewPassword`, 
				{
					password: formData.password,
					confirmPassword: formData.confirmPassword,
					email: email
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)).data;
			// console.log(response);

			router.replace("/auth/login");

			// setApiResponse({
			// 	display: true,
			// 	status: true,
			// 	message: response.message
			// });

		} catch (error: any) {
			// console.log(error);
			// _setAppLoading({ display: false });
			
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			// console.log(err);
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

					<AppText style={styles.subTitle}>
						Enter you new password, it must include uppercase, lowercase, digit, and special character
					</AppText>


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


					<ApiResponse
						display={apiResponse.display}
						status={apiResponse.status}
						message={apiResponse.message}
					/>

					<View style={{marginTop: 20, width: "100%"}}>
						<AppButton
							onPress={handleSubmit(onSubmit)} 
							disabled={ !isValid || isSubmitting }
							loadingIndicator={isSubmitting}
							text='Submit'
							textColor='#fff'
							// btnWidth={"100%"}
							fullWidth={true}
							btnTextTransform='none'
						/>
					</View>
				</View>
			</AppScrollView>
		</AppSafeAreaView>
	)
}

export default SignupPage;

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