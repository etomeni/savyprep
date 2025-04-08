import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';
import AppButton from '@/components/form/AppButton';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AnalysisOverview from '@/components/FeedbackAnalysis/AnalysisOverview';
import QuestionReviewScreen from '@/components/FeedbackAnalysis/QuestionReview';
import BreakdownEvaluation from '@/components/FeedbackAnalysis/BreakdownEvaluation';
import { kolors } from '@/constants/Colors';
import { usePrepStore } from '@/state/prepStore';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { usePrepHook } from '@/hooks/usePrepHook';
import apiClient from '@/util/apiClient';
import { defaultApiResponse } from '@/util/resources';
// import { useSettingStore } from '@/state/settingStore';


export default function FeedbackAnalysis() {
    const { prepId } = useLocalSearchParams();
    const prepFeedback = usePrepStore((state) => state.prepFeedback);
    
    const prepData = usePrepStore((state) => state.prepData);
    const _setPrepData = usePrepStore((state) => state._setPrepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    // const _setAppLoading = useSettingStore((state) => state._setAppLoading);
    
    const { 
        getPrepFeedbackDetailsById,
        // getPrepDetailsById,
    } = usePrepHook();

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        } else if (!prepFeedback._id) {
            getPrepFeedbackDetailsById(prepId.toString());
            // getPrepDetailsById(prepId.toString());
        }
    }, [prepFeedback]);

    	
	// const generateNewQuestions = async () => {
	// 	// setApiResponse(defaultApiResponse);

	// 	try {
	// 		const response = (await apiClient.post(`/prep/generate-interview-questions`, 
    //             {
    //                 title: prepData.prepTitle,
    //                 role: prepData.targetRole,
    //                 level: formData.experienceLevel,
    //                 techstack: skills,
    //                 type: formData.interviewType,
    //                 amount: formData.questionCount || questionCount,
    //                 jobDescription: formData.jobDescription
    //             }   
    //         )).data;
	// 		console.log(response);

    //         _setPrepData(response.result.prep);

    //         router.push({
    //             pathname: "/account/interview/QuestionScreen", 
    //             params: { prepId: response.result.prep._id }
    //         });

	// 		setApiResponse({
	// 			display: true,
	// 			status: true,
	// 			message: response.message
	// 		});

	// 	} catch (error: any) {
	// 		// console.log(error);
	// 		const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
	// 		setApiResponse({
	// 			display: true,
	// 			status: false,
	// 			message: message
	// 		});
	// 	}
	// };


    return (
        <AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
                <Stack.Screen options={{ title: `${prepData.prepType} Feedback` }} />
                
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText style={styles.title}>Feedback, Analysis & Review</AppText>
                        <AppText style={styles.subtitle}>{prepFeedback.prepTitle} {prepFeedback.prepType}</AppText>
                    </View>


                    {/* Progress Section */}
                    <View style={styles.section}>
                        {/* <AppText style={styles.sectionTitle}>Feedback, Analysis & Review</AppText> */}

                        <AnalysisOverview 
                            totalScore={ prepFeedback.totalScore }
                            completion={ prepFeedback.percentageScore }
                            totalQuestions={ prepFeedback.totalQuestions }
                            answeredQuestions={ prepFeedback.answeredQuestions }
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
                        prepType={prepFeedback.prepType}
                        summary={prepFeedback.feedbackSummary}
                        interviewsBreakdown={ prepFeedback.feedbackBreakdowns}
                    />
                    <QuestionReviewScreen questions={ prepFeedback.questionReviews} />

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <AppButton
                            onPress={() => {
                                router.push({
                                    pathname: prepFeedback.prepType == "Interview" ? "/account/interview/QuestionScreen" : "/account/exam/QuestionScreen",
                                    params: { prepId: prepFeedback.prepId || prepId }
                                })
                            }}
                            disabled={false}
                            loadingIndicator={false}
                            text='Restart'
                            textColor='#fff'
                            // btnWidth={"100%"}
                            btnTextTransform='none'
                            fullWidth={true}
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
                            fullWidth={true}
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
		paddingBottom: 85,
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
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        // marginVertical: 20,
    },
});
