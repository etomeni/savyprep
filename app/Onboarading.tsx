import React, { useState } from 'react';
import { 
	View, Text, StyleSheet, TouchableOpacity, 
	ScrollView, Dimensions, Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { setLocalStorage } from '@/util/storage';
import { kolors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
	id: string;
	title: string;
	description?: string;
	features?: { icon: string; text: string }[];
	image?: any; // Would be require('./path/to/image.png') in real usage
}

const OnboardingScreen = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides: OnboardingSlide[] = [
		{
			id: '1',
			title: 'AI-Powered Preparation for Exams & Interviews',
			description: 'Transform your study materials into personalized questions. \n Practice smarter, perform better.',
			image: require('@/assets/images/onboarding.png') // Replace with actual image
		},
		// {
		// 	id: '2',
		// 	title: 'Exam Preparation',
		// 	description: 'Upload your study materials and let our AI generate personalized questions to test your knowledge.',
		// 	image: require('@/assets/images/exams-onboarding.png') // Replace with actual image
		// },
		// {
		// 	id: '3',
		// 	title: 'Interview Preparation',
		// 	description: 'Specify your target role and receive tailored interview questions with AI-generated feedback.',
		// 	image: require('@/assets/images/interview-onboarding.png') // Replace with actual image
		// },
		{
			id: '2',
			title: 'Why Choose SavyPrep',
			description: 'Our platform offers unique advantages that make your preparation more effective and efficient.',
			features: [
				{ icon: 'person-outline', text: 'Personalized Learning' },
				{ icon: 'access-time', text: 'Time-Saving' },
				{ icon: 'trending-up', text: 'Performance Tracking' },
				{ icon: 'devices', text: 'Accessible Anywhere' }
			]
		},
		{
			id: '3',
			title: 'Key Features',
			features: [
				{ icon: 'library-books', text: 'Exam Preparation' },
				{ icon: 'record-voice-over', text: 'Interview Preparation' },
				{ icon: 'feedback', text: 'Comprehensive Feedback' },
				{ icon: 'analytics', text: 'Performance Analytics' },
				{ icon: 'psychology', text: 'Advanced AI Technology' },
				{ icon: 'lock', text: 'Privacy & Security' },
			]
		}
	];

	const goNext = () => {
		if (currentSlide < slides.length - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
			setLocalStorage("onboarding", true);
			router.replace("/auth/login");
		}
	};

	const goBack = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		}
	};

	const renderSlide = () => {
		const slide = slides[currentSlide];

		return (
			<View style={styles.slideContainer}>
				<Text style={styles.title}>{slide.title}</Text>

				{slide.description && (
					<Text style={styles.description}>{slide.description}</Text>
				)}

				{slide.image && (
					<Image source={slide.image} style={styles.image} resizeMode="contain" />
				)}

				{slide.features && (
					<View style={styles.featuresContainer}>
						{slide.features.map((feature, index) => (
							<View key={index} style={styles.featureItem}>
								<MaterialIcons
									name={feature.icon as any}
									size={28}
									color={kolors.theme.secondry}
									style={styles.featureIcon}
								/>
								<Text style={styles.featureText}>{feature.text}</Text>
							</View>
						))}
					</View>
				)}
			</View>
		);
	};

	return (
		<LinearGradient
			colors={['#f8f9fa', '#ffffff']}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				{renderSlide()}
			</ScrollView>

			<View style={styles.footer}>
				{/* Pagination */}
				<View style={styles.pagination}>
					{slides.map((_, index) => (
						<View
							key={index}
							style={[
								styles.paginationDot,
								currentSlide === index && styles.activeDot
							]}
						/>
					))}
				</View>

				{/* Navigation buttons */}
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={goBack}
						disabled={currentSlide === 0}
					>
						<MaterialIcons
							name="arrow-back"
							size={24}
							// color={currentSlide === 0 ? '#ccc' : '#6200ee'}
							color={currentSlide === 0 ? '#ccc' : kolors.theme.secondry}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.nextButton} onPress={goNext}>
						<Text style={styles.nextButtonText}>
							{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
						</Text>
						<MaterialIcons
							name="arrow-forward"
							size={24}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 30,
		paddingTop: 50,
	},
	slideContainer: {
		alignItems: 'center',
		// paddingVertical: "auto",
		marginVertical: "auto",
		// paddingTop: 20,
		// paddingBottom: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#2d3748',
		textAlign: 'center',
		marginBottom: 20,
		lineHeight: 36,
	},
	description: {
		fontSize: 18,
		color: '#718096',
		textAlign: 'center',
		marginBottom: 40,
		lineHeight: 26,
	},
	image: {
		width: "100%", // width * 0.8,
		height: 300, // width * 0.6,
		// backgroundColor: 'red',
		marginBottom: 30,
	},
	featuresContainer: {
		width: '100%',
		marginTop: 20,
	},
	featureItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eef8fc',
		borderRadius: 12,
		padding: 18,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	featureIcon: {
		marginRight: 15,
	},
	featureText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#2d3748',
		flex: 1,
	},
	footer: {
		paddingHorizontal: 30,
		paddingBottom: 40,
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#e2e8f0',
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: kolors.theme.secondry, // '#6200ee',
		width: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backButton: {
		padding: 15,
	},
	nextButton: {
		flex: 1,
		backgroundColor: kolors.theme.secondry, // '#6200ee',
		borderRadius: 30,
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 3,
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		marginRight: 10,
	},
});

export default OnboardingScreen;