import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';
import AppButton from '@/components/form/AppButton';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AnalysisOverview from '@/components/FeedbackAnalysis/AnalysisOverview';
import QuestionReviewScreen from '@/components/FeedbackAnalysis/QuestionReview';
import BreakdownEvaluation from '@/components/FeedbackAnalysis/BreakdownEvaluation';
import { kolors } from '@/constants/Colors';


const InterviewDashboard = () => {
    // Sample data
    const stats = {
        totalScore: 56,
        completion: 40,
        totalQuestions: 10,
        answeredQuestions: 4,
    };

    const summary = "This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative, making it difficult to assess their qualifications, motivation, or suitability for the role.";
    
    const interviewsBreakdown = [
        {
            title: "Enthusiasm & Interest",
            score: 10,
            comment: [
                {
                    feedback: "The candidate openly states, 'I really don't,' when asked why they want to work for the company.",
                    isPositive: false,
                },
                {
                    feedback: "Their response to future career plans ('Probably in some other company') indicates a lack of commitment.",
                    isPositive: true,
                }
            ]
        },
        {
            title: "Communication Skills",
            score: 30,
            comment: [
                {
                    feedback: "The candidate's responses are often unclear and lack detail.",
                    isPositive: false,
                },
                {
                    feedback: "They frequently interrupt the interviewer and do not allow for follow-up questions.",
                    isPositive: false,
                }
            ]
        },
        {
            title: "Technical Knowledge",
            score: 45,
            comment: [
                {
                    feedback: "The candidate struggles to explain basic concepts related to the role.",
                    isPositive: false,
                },
                {
                    feedback: "They seem unprepared for technical questions and provide vague answers.",
                    isPositive: false,
                }
            ]
        },
        {
            title: "Problem-Solving Skills",
            score: 70,
            comment: [
                {
                    feedback: "The candidate does not demonstrate effective problem-solving skills.",
                    isPositive: true,
                },
                {
                    feedback: "They fail to provide logical reasoning or structured approaches to hypothetical scenarios.",
                    isPositive: true,
                }
            ]
        }
    ];

    const questions = [
        {
            id: 1,
            question: "Sample question #1. This is a placeholder question for demonstration purposes.",
            userAnswer: "User's sample answer for question #1",
            suggestedAnswer: "Sample answer for question #1. This is a detailed explanation that would typically be provided by an AI assistant."
        },
        {
            id: 2,
            question: "Sample question #2. This is a placeholder question for demonstration purposes.",
            userAnswer: "User's sample answer for question #2",
            suggestedAnswer: "Sample answer for question #2. This is a detailed explanation that would typically be provided by an AI assistant."
        },
        {
            id: 3,
            question: "Sample question #3. This is a placeholder question for demonstration purposes.",
            userAnswer: "User's sample answer for question #3",
            suggestedAnswer: "Sample answer for question #3. This is a detailed explanation that would typically be provided by an AI assistant."
        },
        {
            id: 4,
            question: "Sample question #4. This is a placeholder question for demonstration purposes.",
            userAnswer: "User's sample answer for question #4",
            suggestedAnswer: "Sample answer for question #4. This is a detailed explanation that would typically be provided by an AI assistant."
        }
    ];


    return (
        <AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
                {/* <Stack.Screen options={{ title: 'Oops!' }} /> */}
                
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText style={styles.title}>Feedback, Analysis & Review</AppText>
                        <AppText style={styles.subtitle}>Frontend Developer Interview</AppText>
                    </View>


                    {/* Progress Section */}
                    <View style={styles.section}>
                        {/* <AppText style={styles.sectionTitle}>Feedback, Analysis & Review</AppText> */}

                        <AnalysisOverview 
                            totalScore={stats.totalScore}
                            completion={stats.completion}
                            totalQuestions={stats.totalQuestions}
                            answeredQuestions={stats.answeredQuestions}
                        />
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="forum" size={24} color={kolors.theme.primary} />
                            <AppText style={styles.actionText}>Discuss</AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <MaterialIcons name="file-download" size={24} color={kolors.theme.primary} />
                            <AppText style={styles.actionText}>Download Q&A</AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <FontAwesome name="share" size={24} color={kolors.theme.primary} />
                            <AppText style={styles.actionText}>Share</AppText>
                        </TouchableOpacity>
                    </View>

                    <BreakdownEvaluation 
                        prepType="Interviews"
                        summary={summary}
                        interviewsBreakdown={interviewsBreakdown}
                    />
                    <QuestionReviewScreen questions={questions} />

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <AppButton
                            onPress={() => {}}
                            disabled={false}
                            loadingIndicator={false}
                            text='Restart'
                            textColor='#fff'
                            // btnWidth={"100%"}
                            btnTextTransform='none'
                        />

                        <AppButton
                            onPress={() => {}}
                            disabled={false}
                            loadingIndicator={false}
                            text='New Questions'
                            textColor='#fff'
                            // btnWidth={"100%"}
                            btnTextTransform='none'
                            btnOutline={true}
                        />
                    </View>


                    {/* Continue Button */}
                    {/* <TouchableOpacity style={styles.continueButton}>
                        <Ionicons name="arrow-forward" size={24} color="white" />
                        <AppText style={styles.continueButtonText}>Continue Preparation</AppText>
                    </TouchableOpacity> */}
                </View>
            </AppScrollView>
        </AppSafeAreaView>
    );
};

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
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    subtitle: {
        fontSize: 18,
        color: '#718096',
        marginTop: 5,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 20,
    },

    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        width: '30%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    actionText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#2d3748',
        textAlign: 'center',
    },
    continueButton: {
        backgroundColor: '#6200ee',
        borderRadius: 12,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    continueButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },



    actionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        // marginVertical: 20,
    },
});

export default InterviewDashboard;