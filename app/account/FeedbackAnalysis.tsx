import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// import { Toast } from 'toastify-react-native';
// import * as MediaLibrary from 'expo-media-library';

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
import apiClient, { API_BASE_URL, apiErrorResponse } from '@/util/apiClient';
// import { defaultApiResponse } from '@/util/resources';
// import { useSettingStore } from '@/state/settingStore';
import LoadingModal from '@/components/custom/LoadingModal';
import { prepFeedbackInterface } from '@/typeInterfaces/prepInterface';
import SkeletonFeedback from '@/components/FeedbackAnalysis/SkeletonFeedback';
// import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';


export default function FeedbackAnalysis() {
    const { prepId } = useLocalSearchParams();
    const _setPrepFeedback = usePrepStore((state) => state._setPrepFeedback);
    // const prepFeedback = usePrepStore((state) => state.prepFeedback);
    const [prepFeedbackDetails, setPrepFeedbackDetails] = useState<prepFeedbackInterface>();

    // const prepData = usePrepStore((state) => state.prepData);
    const _setPrepData = usePrepStore((state) => state._setPrepData);
    // const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    // const _setAppLoading = useSettingStore((state) => state._setAppLoading);
    const [showLoadingModal, setShowLoadingModal] = useState({
        display: false,
        success: false,
    });
    const [showShareFeedbackModal, setShowShareFeedbackModal] = useState(false);

    // const { 
    //     prepFeedbackDetails, getPrepFeedbackDetailsById,
    //     // getPrepDetailsById,
    // } = usePrepHook();

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        // } else if (prepFeedbackDetails._id != prepId) {
        } else {
            getPrepFeedbackDetailsById(prepId.toString());
        }
        // console.log(prepFeedback);
    }, []);


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

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", true);
            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: message
            // });
        }
    };

    const generateNewQuestions = async () => {
        // setApiResponse(defaultApiResponse);
        if (!prepFeedbackDetails) return;
        setShowLoadingModal({ display: true, success: false });

        try {
            const response = (await apiClient.post(`/prep/generate-new-questions`,
                {
                    prepId: prepFeedbackDetails?.prepId || prepId,
                    prepType: prepFeedbackDetails?.prepType || '',
                    feedbackId: prepFeedbackDetails?._id || '',
                }
            )).data;
            // console.log(response);
            setShowLoadingModal({ display: false, success: false })

            _setPrepData(response.result.prep);

            router.push({
                pathname: prepFeedbackDetails.prepType == "Exam" ? "/account/exam/QuestionScreen" : "/account/interview/QuestionScreen",
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

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", true);
            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: message
            // });
        }
    };

    const handleDownloadFeedback = async () => {
        // setApiResponse(defaultApiResponse);
        // setShowLoadingModal({ display: true, success: false });
        if (!prepFeedbackDetails) return;

        try {
            const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
                const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                // console.log(progress);
                // this.setState({
                //   downloadProgress: progress,
                // });
            };
              
            const fileName = `${prepFeedbackDetails.prepTitle.replace(/ /g, '_')}_Feedback.pdf`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            const accessToken  = useUserStore.getState().accessToken;
            const downloadResumable = FileSystem.createDownloadResumable(
                `${API_BASE_URL}/prep/generate-pdf?feedbackId=${prepFeedbackDetails._id}`,
                fileUri,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        // responseType: 'blob', // Important for binary responses
                    },
                },
                callback
            );

            const downloadResult = await downloadResumable.downloadAsync();
            if (downloadResult && downloadResult.uri) {
                const { uri } = downloadResult;
                await Sharing.shareAsync(uri);
            } else {
                // 1. Call your API to generate the PDF with Axios
                const response = await apiClient.get(
                    `/prep/generate-pdf?feedbackId=${prepFeedbackDetails._id}`,
                    {
                        responseType: 'blob', // Important for binary responses
                    }
                );

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
                await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                await Sharing.shareAsync(fileUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Share Feedback PDF',
                    UTI: 'com.adobe.pdf',
                });
            }
          
            // setShowLoadingModal({ display: false, success: false })
        } catch (error: any) {
            // console.log(error);
            // setShowLoadingModal({ display: false, success: false });

            const message = apiErrorResponse(error, "Ooops, Download failed. Please try again.", true);
            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: message
            // });
        }
    };


    return (
        <AppSafeAreaView>
            <AppScrollView>
                <Stack.Screen options={{ title: `${prepFeedbackDetails?.prepType} Feedback` }} />

                {
                    prepFeedbackDetails ?
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <AppText style={styles.title}>Feedback, Analysis & Review</AppText>
                                <AppText style={styles.subtitle}>
                                    {prepFeedbackDetails?.prepTitle}
                                    {" "}
                                    {prepFeedbackDetails?.prepType}
                                </AppText>
                            </View>


                            {/* Progress Section */}
                            <View style={styles.section}>
                                {/* <AppText style={styles.sectionTitle}>Feedback, Analysis & Review</AppText> */}

                                <AnalysisOverview
                                    prepType={prepFeedbackDetails?.prepType}
                                    totalScore={prepFeedbackDetails.totalScore}
                                    completion={prepFeedbackDetails.percentageScore}
                                    totalQuestions={prepFeedbackDetails.totalQuestions}
                                    answeredQuestions={prepFeedbackDetails.answeredQuestions}
                                />
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity style={styles.actionButton}
                                    onPress={() => {
                                        router.push({
                                            pathname: "/account/AIDiscussAssistant",
                                            params: {
                                                prepId: prepFeedbackDetails.prepId,
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

                                <TouchableOpacity style={styles.actionButton}
                                    onPress={() => setShowShareFeedbackModal(true)}
                                >
                                    <FontAwesome name="share" size={24} color={kolors.theme.primary} />
                                    <AppText style={styles.actionText}>Share</AppText>
                                </TouchableOpacity>
                            </View>

                            <BreakdownEvaluation
                                prepType={prepFeedbackDetails.prepType}
                                summary={prepFeedbackDetails.feedbackSummary}
                                strengths={prepFeedbackDetails.strengths}
                                areasForImprovement={prepFeedbackDetails.areasForImprovement}
                                interviewsBreakdown={prepFeedbackDetails.feedbackBreakdowns}
                            />
                            <QuestionReviewScreen questions={prepFeedbackDetails.questionReviews} />


                            {/* Final Assessment */}
                            <AppText style={[styles.sectionTitle, {marginBottom: 5}]}>Final Assessment:</AppText>
                            <View style={styles.summaryCard}>
                                <AppText style={styles.summaryText}
                                >{ prepFeedbackDetails.finalAssessment }</AppText>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionButtons}>
                                <AppButton
                                    onPress={() => {
                                        router.push({
                                            pathname: prepFeedbackDetails.prepType == "Interview" ? "/account/interview/QuestionScreen" : "/account/exam/QuestionScreen",
                                            params: { prepId: prepFeedbackDetails.prepId || prepId }
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

            { prepFeedbackDetails &&
                <ShareFeedbackModal
                    display={showShareFeedbackModal}
                    setDisplay={setShowShareFeedbackModal}
                    prepFeedback={prepFeedbackDetails}
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
        paddingBottom: 45,
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
        // paddingBottom: 20
    },

    summaryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4a5568',
    },
});
