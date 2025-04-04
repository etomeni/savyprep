import React, { useState } from 'react';
// import axios from 'axios';
import Checkbox from 'expo-checkbox';

import { kolors } from '@/constants/Colors';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Link, router } from 'expo-router';
// import AppSafeAreaView from '@/components/AppSafeAreaView';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { passwordRegex } from '@/util/resources';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppText from '@/components/custom/AppText';
import AppInputField from '@/components/form/AppInputField';
import ApiResponse from '@/components/form/ApiResponse';
import AppButton from '@/components/form/AppButton';


const formSchema = yup.object({
	// emailPhoneNum: yup.string().required().trim().label("Email or phone number"),
	email: yup.string().required()
		.email("Please enter a valid email address.")
		.matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
			, "Please enter a valid email address.")
		.trim().label("Email address"),
});

const ForgetPassword = () => {
	const [apiResponse, setApiResponse] = useState({
		display: false,
		status: true,
		message: ""
	});

	// const _loginUser = useUserStore((state) => state._loginUser);
	// // const _signupMethod = useUserStore((state) => state._signupMethod);
	// const _setUserDetails = useUserStore((state) => state._setUserDetails);
	// const _setAppLoading = useSettingStore((state) => state._setAppLoading);

	const {
		control, handleSubmit, formState: { errors, isValid, isSubmitting }
	} = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur' });


	// const onSubmit = async (formData: typeof formSchema.__outputType) => {
	//   // Simulate form submission
	//   // console.log('Submitted Data:', formData);
	//   _setAppLoading({ display: true });
	//   try {
	//     const response = (await axios.post(`${apiEndpoint}/auth/login`, formData)).data;
	//     // console.log(response);

	//     if (response.status) {
	//       const user = response.resultData;
	//       // TODO:: remove pin and password details from this response
	//       // console.log(user);

	//       setApiResponse({
	//         display: true,
	//         status: true,
	//         message: response.message
	//       });

	//       // TODO:: display success animation alert or modal before navigating to the login page.
	//       _setAppLoading({ display: true, success: true });

	//       _setUserDetails(user, response.token);


	//       // if (!user.isEmailVerified) {
	//       //   handleResendEmailVerifyToken(
	//       //     user.email, user.firstName, user.lastName, user.middleName
	//       //   );
	//       //   // router.replace("/auth/CodeVerification");
	//       //   router.replace({
	//       //     pathname: "/auth/CodeVerification",
	//       //     params: { 
	//       //       email: user.email,
	//       //       action: "login"
	//       //     },
	//       //   });
	//       //   return;
	//       // }

	//       // if (!user.isPhoneNumberVerified) {
	//       //   const response = await sendPhoneVerificationToken(user.phoneNumber);
	//       //   if (response.status) _signupMethod({verificationToken: response.verificationToken });

	//       //   router.replace({
	//       //     pathname: "/auth/PhoneVerification",
	//       //     params: { 
	//       //       action: "login",
	//       //       phoneNumber: user.phoneNumber,
	//       //       // email: user.email,
	//       //     },
	//       //   });
	//       //   return;
	//       // }

	//       if (!user.pin) {
	//         router.replace("/auth/Pin");
	//         return;
	//       }

	//       _loginUser(user, response.token);
	//       router.replace("/account/");
	//       return;
	//     }

	//     setApiResponse({
	//       display: true,
	//       status: false,
	//       message: `${response.message} ${response.errors && response.errors[0].msg}` || "Oooops failed. please try again."
	//     });
	//   } catch (error: any) {
	//     console.log(error);

	//     _setAppLoading({ display: false });
	//     const err = error.response.data || error;
	//     // console.log(err);
	//     setApiResponse({
	//       display: true,
	//       status: false,
	//       message: err.message || "Oooops failed. please try again."
	//     });
	//   }
	// };

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
					

					<AppText style={styles.subTitle}>Enter your email and we will send you a link to reset your password</AppText>

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

					<ApiResponse
						display={apiResponse.display}
						status={apiResponse.status}
						message={apiResponse.message}
					/>

					<View style={{marginTop: 20, width: "100%"}}>
						<AppButton
							// onPress={handleSubmit(onSubmit)} 
							onPress={() => {}}
							disabled={ !isValid || isSubmitting }
							loadingIndicator={isSubmitting}
							text='Submit'
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
									<AppText style={{color: kolors.theme.primary}}> Sign up</AppText>
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

export default ForgetPassword;

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