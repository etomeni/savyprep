import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import AppText from '@/components/custom/AppText';
import AppButton from '@/components/form/AppButton';
import AppScrollView from '@/components/custom/AppScrollView';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AnalysisOverview from '@/components/FeedbackAnalysis/AnalysisOverview';
import QuestionReviewScreen from '@/components/FeedbackAnalysis/QuestionReview';
import BreakdownEvaluation from '@/components/FeedbackAnalysis/BreakdownEvaluation';
import { kolors } from '@/constants/Colors';
import { usePrepStore } from '@/state/prepStore';
// import { usePrepHook } from '@/hooks/usePrepHook';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { defaultApiResponse } from '@/util/resources';
// import { useSettingStore } from '@/state/settingStore';
import LoadingModal from '@/components/custom/LoadingModal';
import { prepFeedbackInterface } from '@/typeInterfaces/prepInterface';
import SkeletonFeedback from '@/components/FeedbackAnalysis/SkeletonFeedback';
// import { useSettingStore } from '@/state/settingStore';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';



export default function FeedbackAnalysis() {
    const { prepId } = useLocalSearchParams();
    const _setPrepFeedback = usePrepStore((state) => state._setPrepFeedback);
    const prepFeedback = usePrepStore((state) => state.prepFeedback);
    const [prepFeedbackDetails, setPrepFeedbackDetails] = useState<prepFeedbackInterface>();

    // const prepData = usePrepStore((state) => state.prepData);
    const _setPrepData = usePrepStore((state) => state._setPrepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    // const _setAppLoading = useSettingStore((state) => state._setAppLoading);
    const [showLoadingModal, setShowLoadingModal] = useState({
        display: false,
        success: false,
    });

    // const { 
    //     prepFeedbackDetails, getPrepFeedbackDetailsById,
    //     // getPrepDetailsById,
    // } = usePrepHook();

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        } else if (prepFeedback._id != prepId) {
            getPrepFeedbackDetailsById(prepId.toString());
        }
        // console.log(prepFeedback);
    }, [prepFeedback._id]);


    const getPrepFeedbackDetailsById = async (prepId: string) => {
        // setShowLoadingModal({ display: true, success: false });

        try {
            const response = (await apiClient.get(`/prep/feedback/${prepId}`)).data;
            // console.log(response);

            // setShowLoadingModal({ display: false, success: false });

            const feedback: prepFeedbackInterface = response.result.feedback;
            setPrepFeedbackDetails(feedback);
            _setPrepFeedback(feedback);

        } catch (error: any) {
            // console.log(error);
            // setShowLoadingModal({ display: false, success: false });

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
            setApiResponse({
                display: true,
                status: false,
                message: message
            });
        }
    };

    const generateNewQuestions = async () => {
        setApiResponse(defaultApiResponse);
        setShowLoadingModal({ display: true, success: false });

        try {
            const response = (await apiClient.post(`/prep/generate-new-questions`,
                {
                    prepId: prepId || prepFeedback.prepId,
                    prepType: prepFeedbackDetails?.prepType || prepFeedback.prepType,
                    feedbackId: prepFeedbackDetails?._id || prepFeedback._id,
                }
            )).data;
            // console.log(response);
            setShowLoadingModal({ display: false, success: false })

            _setPrepData(response.result.prep);

            router.push({
                pathname: prepFeedback.prepType == "Exam" ? "/account/exam/QuestionScreen" : "/account/interview/QuestionScreen",
                params: { prepId: response.result.prep._id }
            });

            // setApiResponse({
            // 	display: true,
            // 	status: true,
            // 	message: response.message
            // });

        } catch (error: any) {
            // console.log(error);
            setShowLoadingModal({ display: false, success: false });

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
            setApiResponse({
                display: true,
                status: false,
                message: message
            });
        }
    };

    const handleDownloadFeedback = async () => {
        setApiResponse(defaultApiResponse);
        setShowLoadingModal({ display: true, success: false });

        try {
            // 1. Call your API to generate the PDF with Axios
            const response = await apiClient.get(
                `/prep/generate-pdf?feedbackId=${prepFeedback._id}`,
                {
                    responseType: 'blob', // Important for binary responses
                }
            );
            console.log(response);
            setShowLoadingModal({ display: false, success: false })


            // 2. Get the PDF as blob directly from Axios response
            const pdfBlob = response.data;

            // 3. Convert blob to base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);

            const pdfBase64 = await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    resolve(base64data.split(',')[1]); // Remove data URL prefix
                };
                reader.onerror = reject;
            });

            // 4. Save to local filesystem
            const fileName = `${prepFeedback.prepTitle.replace(/ /g, '_')}_Feedback.pdf`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // 5. Handle the saved file based on platform
            if (Platform.OS === 'android') {
                // For Android, request permission and save to downloads
                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.granted) {
                    await MediaLibrary.saveToLibraryAsync(fileUri);
                    // Alert.alert('Success', 'PDF saved to your device!');
                    console.log("Success', 'PDF saved to your device!");
                } else {
                    // If permission denied, offer sharing option
                    await Sharing.shareAsync(fileUri, {
                        mimeType: 'application/pdf',
                        dialogTitle: 'Share Feedback PDF',
                        UTI: 'com.adobe.pdf',
                    });
                }
            } else {
                // For iOS, use the share dialog
                await Sharing.shareAsync(fileUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Save Feedback PDF',
                    UTI: 'com.adobe.pdf',
                });
            }


        } catch (error: any) {
            // console.log(error);
            setShowLoadingModal({ display: false, success: false });

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
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
                <Stack.Screen options={{ title: `${prepFeedbackDetails?.prepType || prepFeedback.prepType} Feedback` }} />

                {
                    prepFeedbackDetails ?
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <AppText style={styles.title}>Feedback, Analysis & Review</AppText>
                                <AppText style={styles.subtitle}>
                                    {prepFeedbackDetails?.prepTitle || prepFeedback.prepTitle}
                                    {" "}
                                    {prepFeedbackDetails?.prepType || prepFeedback.prepType}
                                </AppText>
                            </View>


                            {/* Progress Section */}
                            <View style={styles.section}>
                                {/* <AppText style={styles.sectionTitle}>Feedback, Analysis & Review</AppText> */}

                                <AnalysisOverview
                                    prepType={prepFeedbackDetails?.prepType || prepFeedback.prepType}
                                    totalScore={prepFeedbackDetails.totalScore || prepFeedback.totalScore}
                                    completion={prepFeedbackDetails.percentageScore || prepFeedback.percentageScore}
                                    totalQuestions={prepFeedbackDetails.totalQuestions || prepFeedback.totalQuestions}
                                    answeredQuestions={prepFeedbackDetails.answeredQuestions || prepFeedback.answeredQuestions}
                                />
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity style={styles.actionButton}
                                    onPress={() => {
                                        router.push({
                                            pathname: "/account/AIDiscussAssistant",
                                            params: {
                                                prepId: prepFeedbackDetails.prepId || prepFeedback.prepId,
                                                prepFeedbackId: prepFeedbackDetails._id
                                            }
                                        })
                                    }}
                                >
                                    <MaterialIcons name="forum" size={24} color={kolors.theme.primary} />
                                    <AppText style={styles.actionText}>Discuss</AppText>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionButton}
                                    onPress={handleDownloadFeedback}
                                >
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
                                interviewsBreakdown={prepFeedback.feedbackBreakdowns}
                            />
                            <QuestionReviewScreen questions={prepFeedback.questionReviews} />

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
                                    onPress={() => { generateNewQuestions() }}
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
                        : <SkeletonFeedback />
                }

            </AppScrollView>


            {showLoadingModal.display &&
                <LoadingModal
                    display={showLoadingModal.display}
                    success={showLoadingModal.success}
                    overlayBgColor={kolors.theme.overlayBgColor}
                />
            }
        </AppSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

        width: "100%",
        maxWidth: 600,
        // paddingBottom: 45,
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
