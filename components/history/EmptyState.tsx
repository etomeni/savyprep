import React from 'react';
import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppText from '@/components/custom/AppText';
import AppButton from '@/components/form/AppButton';
import { kolors } from '@/constants/Colors';


type _Props = {
    activeTab: 'All Sessions' | 'Exam Prep' | 'Interview Prep' | string,
};
  
export default function EmptyState({
    activeTab = 'All Sessions',
}: _Props) {
    let messageTitle = 'No sessions found';
    let message = 'Start your first prep session now';
    let button1 = 'Start Exam Prep';
    let button2 = 'Start Interview Prep';
    let icon = <MaterialCommunityIcons name="file-check-outline" size={55} color="#d1d5db" />;

    if (activeTab === 'Exam Prep') {
        messageTitle = "No exam sessions found";
        message = 'Start your first exam prep session now';
        button2 = '';

        icon = <Ionicons name="book-outline" size={55} color="#d1d5db" />
    } else if (activeTab === 'Interview Prep') {
        messageTitle = "No interview sessions found";
        message = 'Start your first interview prep session now';
        button1 = '';

        icon = <AntDesign name="filetext1" size={55} color="#d1d5db" />
    }


    return (
        <View style={styles.emptyContainer}>
            <View style={{marginBottom: 20}}>{ icon }</View>
            
            <AppText style={styles.emptyTitle}
            >{ messageTitle }</AppText>

            <AppText style={styles.emptyMessage}
            >{message}</AppText>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: 20,
            }}>
                {button1 && (
                    <AppButton
                        onPress={() => {
                            router.push("/account/exam/ExamPreparation");
                        }}
                        // disabled={!isValid || isSubmitting}
                        loadingIndicator={false}
                        text={button1}
                        textColor='#fff'
                        // btnWidth={"100%"}
                        btnTextTransform='none'
                        btnBgColor={kolors.theme.secondry}
                        btnSecondaryBgColor={kolors.theme.primary}
                    />
                )}

                {button2 && (
                    <AppButton
                        onPress={() => {
                            router.push("/account/interview/InterviewPreparation");
                        }}
                        // disabled={!isValid || isSubmitting}
                        loadingIndicator={false}
                        text={button2}
                        textColor='#fff'
                        // btnWidth={"100%"}
                        btnTextTransform='none'
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#333',
	},
	emptyMessage: {
		fontSize: 16,
		color: '#666',
		marginBottom: 24,
		textAlign: 'center',
	},
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// gap: 20,
	},
	primaryButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginBottom: 12,
		width: '80%',
		alignItems: 'center',
	},
	secondaryButton: {
		backgroundColor: '#e7f1ff',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		width: '80%',
		alignItems: 'center',
	},
	buttonText: {
		color: '#007AFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
})