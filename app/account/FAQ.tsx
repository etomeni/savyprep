import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '@/components/custom/AppText';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';

import { Collapsible } from '@/components/Collapsible';
import { Stack } from 'expo-router';


export default function FAQ() {
	// const userData = useUserStore((state) => state.userData);
	// const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	return (
		<AppSafeAreaView>
			<AppScrollView>
				<Stack.Screen options={{ title: 'FAQ' }} />

				<View style={styles.container}>

					<View style={styles.headerContainer}>
						<AppText style={styles.headerText}
						>Frequently Asked Questions</AppText>

						{/* <AppText style={styles.subheader}
						></AppText> */}
					</View>

					<View style={{gap: 15}}>
						<Collapsible title="How accurate are the AI-generated questions?">
							<AppText style={styles.collapsibleText}>
								Our AI is trained on a vast dataset of academic and professional content, enabling it to generate highly relevant questions.
								For exam prep, the quality of questions depends on the clarity and quality of the uploaded materials. 
								For interviews, questions are tailored to industry standards for your specified role and experience level.
							</AppText>
						</Collapsible>

						<Collapsible title="Is my data secure?">
							<AppText style={styles.collapsibleText}>
								Yes, we take security seriously. 
								Your uploaded documents and preparation data are encrypted and only used to generate questions for you. 
								We never share your materials with third parties or use them to train our AI models without explicit consent.
							</AppText>
						</Collapsible>

						<Collapsible title="What file types can I upload for exam preparation?">
							<AppText style={styles.collapsibleText}>
								You can upload PDFs, Word documents (.doc, .docx), 
								PowerPoint presentations (.ppt, .pptx), 
								images (.jpg, .jpeg, .png), and text files (.txt). 
								The total file size is limited to 30MB, and you can upload up to 5 documents per session.
							</AppText>
						</Collapsible>

						<Collapsible title="Can I use SavyPrep for any type of exam or interview?">
							<AppText style={styles.collapsibleText}>
								Yes! SavyPrep works for a wide range of 
								academic exams (including standardized tests, board exams, and course finals) 
								and professional interviews (including technical, behavioral, and industry-specific interviews). 
								The AI adapts to generate appropriate questions based on your materials and specifications.
							</AppText>
						</Collapsible>

						<Collapsible title="What's the difference between the subscription plans?">
							<AppText style={styles.collapsibleText}>
								Our free plan offers basic features with limited monthly sessions. 
								Paid plans provide more sessions per month, advanced AI models for higher-quality questions, priority support, and additional features like analytics. 
								Visit our pricing page for a detailed comparison.
							</AppText>
						</Collapsible>
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

	collapsibleText: {
		fontSize: 15,
		color: '#666',
		marginBottom: 20,
		textAlign: "auto",
		lineHeight: 25
	},

})