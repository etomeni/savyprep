import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';

const NotFoundScreen = () => {

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<StatusBar style="auto" />

			<View style={styles.content}>
				{/* You can replace this with your own image */}
				<AppText style={styles.errorCode}>404</AppText>

				<AppText style={styles.title}>Page Not Found</AppText>

				<AppText style={styles.message}>
					Sorry, we couldn't find the page you're looking for. It might
					have been moved, deleted, or never existed.
				</AppText>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, styles.primaryButton]}
						onPress={() => router.push('/account')}
					>
						<AppText style={styles.buttonText}>Back to Dashboard</AppText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.secondaryButton]}
						onPress={() => {
							if (router.canGoBack()) {
								router.back()
							} else {
								router.push('/account')
							}
						}}
					>
						<AppText style={[styles.buttonText, styles.secondaryButtonText]}>Go Back</AppText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 24,
	},
	content: {
		alignItems: 'center',
	},
	errorCode: {
		fontSize: 80,
		fontWeight: 'bold',
		color: kolors.theme.secondry, // '#ff3d71', // Or your brand's error color
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#2d3748',
		marginBottom: 16,
		textAlign: 'center',
	},
	message: {
		fontSize: 16,
		color: '#718096',
		textAlign: 'center',
		marginBottom: 32,
		lineHeight: 24,
		maxWidth: width * 0.8,
	},
	buttonContainer: {
		width: '100%',
		maxWidth: 400,
	},
	button: {
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
	},
	primaryButton: {
		backgroundColor: kolors.theme.secondry, // '#6200ee', // Or your primary color
	},
	secondaryButton: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: kolors.theme.secondry, // '#6200ee',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
	secondaryButtonText: {
		color: kolors.theme.secondry, // '#6200ee',
	},
});

export default NotFoundScreen;