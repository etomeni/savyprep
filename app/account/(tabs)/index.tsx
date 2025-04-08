import { Image, StyleSheet, Platform, View, TouchableOpacity, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
import { router } from 'expo-router';
import ListItemComponent from '@/components/custom/ListItemComponent';
import KeyFeaturesScreen from '@/components/AppKeyFeatures';
import BannerCtaCard from '@/components/BannerCtaCard';
import { usePrepHook } from '@/hooks/usePrepHook';
import { useEffect } from 'react';
import { prepInterface } from '@/typeInterfaces/prepInterface';
import { formatDateToDDMMYYYY } from '@/util/resources';
import { usePrepStore } from '@/state/prepStore';


export default function HomeScreen() {
	const userData = useUserStore((state) => state.userData);
	// const _setAppLoading = useSettingStore((state) => state._setAppLoading);
	const _setPrepData = usePrepStore((state) => state._setPrepData);

	const { getAllPreps, allPrep } = usePrepHook();

	useEffect(() => {
		getAllPreps(1, 5, "All");
	}, []);

	const displayRecentSubTitle = (prep: prepInterface) => {
		let subtitle = formatDateToDDMMYYYY(prep.createdAt) + " • ";

		subtitle += `${prep.numberOfQuestions} questions • `;
		subtitle += `${prep.difficultyLevel} • `;

		if (prep?.interview?.interviewType) {
			subtitle += `${ prep.interview.interviewType } interview • `
		} 
		// else if (prep?.exam?.studyType) {
		// 	subtitle += `${ prep.exam.studyType } • `
		// }

		return subtitle;
	}
	


	return (
		<AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
				<View style={styles.container}>

					<View style={styles.welcomeContainer}>
						<View style={styles.titleContainer}>
							<AppText
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									// lineHeight: 32,
								}}
							>Welcome back, {userData.fullName}!</AppText>
							<HelloWave />
						</View>

						<AppText>Continue your preparation journey.</AppText>
					</View>

					<View style={styles.statCardContainer}>

						<View style={styles.statCard}>
							<MaterialCommunityIcons name="lightning-bolt-outline" size={30} color="#f59f0b" />

							<AppText style={styles.statCardNumber}
							>0</AppText>

							<AppText style={styles.statCardText}
							>Total Preps!</AppText>

						</View>

						<View style={styles.statCard}>
							<Ionicons name="book-outline" size={30} color={kolors.theme.secondry} />

							<AppText style={styles.statCardNumber}
							>0</AppText>

							<AppText style={styles.statCardText}
							>Exam Preps</AppText>
						</View>

						<View style={styles.statCard}>
							<AntDesign name="filetext1" size={30} color={kolors.theme.secondry} />

							<AppText style={styles.statCardNumber}
							>0</AppText>

							<AppText style={styles.statCardText}
							>Interview Preps</AppText>
						</View>

						<View style={styles.statCard}>
							<MaterialIcons name="auto-graph" size={30} color="green" />

							<AppText style={styles.statCardNumber}
							>0</AppText>

							<AppText style={styles.statCardText}
							>Completed</AppText>
						</View>
					</View>

					<View style={styles.prepCardContainer}>
						<View style={styles.prepCard}>
							<View style={styles.prepCardHeader}>
								<MaterialCommunityIcons name="book-outline" size={24} color="#4CC4F1" />

								<AppText style={styles.prepCardTitle}
								>Exam Preparation</AppText>
							</View>

							<AppText style={styles.prepCardDescription}
							>Practice with AI-generated questions</AppText>

							<AppText style={styles.prepCardSubText}
							>Upload your study materials and get personalized questions to test your knowledge.</AppText>

							<TouchableOpacity style={styles.prepCardButton} onPress={() => router.push('/account/exam/ExamPreparation')}>
								<AppText style={styles.prepCardButtonText}
								>Start Exam Prep</AppText>
							</TouchableOpacity>
						</View>

						<View style={styles.prepCard}>
							<View style={styles.prepCardHeader}>
								<MaterialCommunityIcons name="file-document-outline" size={24} color="#4CC4F1" />

								<AppText style={styles.prepCardTitle}
								>Interview Preparation</AppText>
							</View>

							<AppText style={styles.prepCardDescription}
							>Prepare for your upcoming interviews</AppText>

							<AppText style={styles.prepCardSubText}
							>Simulate real interview scenarios with questions tailored to your target role.</AppText>

							<TouchableOpacity style={styles.prepCardButton} onPress={() => router.push('/account/interview/InterviewPreparation')}>
								<AppText style={styles.prepCardButtonText}
								>Start Interview Prep</AppText>
							</TouchableOpacity>
						</View>
					</View>

					<KeyFeaturesScreen />


					{ 
						allPrep ?
							<View>
								<View style={styles.recentPrepHeader}>
									<AppText style={styles.recentPrepTitle}>Recent Preparations</AppText>

									<TouchableOpacity style={styles.recentPrepViewAllBtn} onPress={() => router.push('/account/history')}>
										<AppText style={{color: kolors.theme.secondry}}>View all</AppText>
										<MaterialIcons name="arrow-forward-ios" size={16} color={kolors.theme.secondry} />
									</TouchableOpacity>
								</View>

								<View>
									{
										allPrep.map((prep) => (
											<Pressable key={prep._id} 
												onPress={() => {
													if (prep.status != "Completed") {
											            _setPrepData(prep);

														if (prep.prepType == "Interview") {
															router.push({
																pathname: "/account/interview/QuestionScreen",
																params: { prepId: prep._id }
															});
														} else {
															router.push({
																pathname: "/account/exam/QuestionScreen",
																params: { prepId: prep._id }
															});
														}
														
													} else {
														router.push({
															pathname: "/account/FeedbackAnalysis",
															params: { prepId: prep._id }
														});
													}
												}}
											>
												<ListItemComponent
													iconName={prep.prepType == "Exam" ? "book-outline" : "business-outline" }
													itemTitle={prep.prepTitle}
													itemSubTitle={displayRecentSubTitle(prep)}
												/>
											</Pressable>
										))
									}

									{/* <Pressable onPress={() => router.push("/account/FAQ")}>
										<ListItemComponent
											iconName='business-outline'
											itemTitle='Javascript'
											itemSubTitle='03/04/2025 • intermediate level'
										/>
									</Pressable> */}
								</View>
							</View>
						: <></>
					}


					<BannerCtaCard />
				</View>
			</AppScrollView>
		</AppSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",

		width: "100%",
		maxWidth: 600,
		paddingTop: 25,
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	welcomeContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 25,
		marginTop: 15,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	statCardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: "wrap",
		gap: 10,
	},
	statCard: {
		flexBasis: '48%', // Ensures two cards per row with some spacing
		flexDirection: 'column',
		alignItems: 'center',
		gap: 5,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		padding: 16,
		backgroundColor: '#fff',
	},
	statCardNumber: {
		fontSize: 20,
		fontWeight: '700',
	},
	statCardText: {
		fontSize: 14,
		fontWeight: '500',
		// lineHeight: 32,
	},

	prepCardContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		// padding: 20,
		marginTop: 20,
		marginBottom: 20,
		// backgroundColor: '#F8F9FA',
	},
	prepCard: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
		width: '100%',
		marginBottom: 15,
	},
	prepCardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	prepCardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 8,
	},
	prepCardDescription: {
		fontSize: 14,
		// color: '#555',
		color: kolors.theme.primary
	},
	prepCardSubText: {
		fontSize: 14,
		color: '#555',
		marginTop: 5,
		marginBottom: 15,
	},
	prepCardButton: {
		backgroundColor: '#4CC4F1',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	prepCardButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},

	recentPrepHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		marginBottom: 10,
	},
	recentPrepTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		// marginLeft: 8,
	},
	recentPrepViewAllBtn: {
		backgroundColor: '#F8F9FA',
		padding: 8,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 5,
	}
	
});
