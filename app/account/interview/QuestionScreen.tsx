import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import AppText from '@/components/custom/AppText';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import ApiResponse from '@/components/form/ApiResponse';
import { usePrepStore } from '@/state/prepStore';
// import { useSettingStore } from '@/state/settingStore';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { defaultApiResponse, formatTime, pauseExecution } from '@/util/resources';
import { 
    prepFeedbackInterface, prepInterface, questionInterface 
} from '@/typeInterfaces/prepInterface';
import LoadingModal from '@/components/custom/LoadingModal';
import { kolors } from '@/constants/Colors';


export default function QuestionScreen() {
    const { prepId } = useLocalSearchParams();
    const _prepData = usePrepStore((state) => state.prepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const _setPrepData = usePrepStore((state) => state._setPrepData);
    const _setPrepFeedback = usePrepStore((state) => state._setPrepFeedback);
    // const _setAppLoading = useSettingStore((state) => state._setAppLoading);
    const [prepData, setPrepData] = useState<prepInterface>(_prepData);
    const [showLoadingModal, setShowLoadingModal] = useState({
        display: false,
        success: false,
    });

    const [questions, setQuestions] = useState<questionInterface[]>(
        prepData.transcript.map((question) => ({ ...question, userAnswer: '' }))
    );
    const questionsRef = useRef<questionInterface[]>([]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answerInput, setAnswerInput] = useState('');

    const [timeElapsed, setTimeElapsed] = useState(0); // seconds
    const [isSaved, setIsSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        // } else if (!prepData._id) {
        } else {
            getPrepQuestions();
        }
    }, []);

    // Auto-update timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        questionsRef.current = questions;
    }, [questions]);

    const getPrepQuestions = async () => {
		try {
			const response = (await apiClient.get(`/prep/details/${prepId}`)).data;
            // console.log(response);

            const prep: prepInterface = response.result.prep;
            setPrepData(prep);
            _setPrepData(prep);
            // setQuestions(prep.transcript);
            setQuestions(
                prep.transcript.map((question) => ({ ...question, userAnswer: '' }))
            );

		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }

    const onSubmit = async () => {
        // console.log(questions);
        setShowLoadingModal({ display: true, success: false });
        setIsSubmitting(true);

        await pauseExecution(3000); // 3 secs

		try {
			const response = (await apiClient.post(`/prep/generate-interview-feedback`,
                {
                    prepId: prepData._id || prepId,
                    transcript: questionsRef.current || questions,
                    timeElapsed
                }
            )).data;
            // console.log(response);

            const prep: prepFeedbackInterface = response.result.feedback;
            _setPrepFeedback(prep);

            setShowLoadingModal({display: false, success: false});
            setIsSubmitting(false);

            router.push({
                pathname: "/account/FeedbackAnalysis",
                params: { prepId: prepData._id || prepId }
            });

		} catch (error: any) {
			// console.log(error);
            setShowLoadingModal({ display: false, success: false });
            setIsSubmitting(false);

			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }


    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsSaved(false);
            setAnswerInput(questions[currentQuestionIndex -1]?.userAnswer || '')
        }
    };

    const handleNext = (userAnswer: string) => {
        if (!userAnswer) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please provide an answer."
            });
            return;
        };
        
        if (currentQuestionIndex < questions.length - 1) {
            // setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsSaved(false);

            // setQuestions((prevQuestions) =>
            //     prevQuestions.map((question) =>
            //         question._id === currentQuestion._id ? { ...question, userAnswer: userAnswer } : question
            //     )
            // );


            const updated = questionsRef.current.map((question) =>
                question._id === currentQuestion._id
                ? { ...question, userAnswer: userAnswer }
                : question
            );
            questionsRef.current = updated;
            setQuestions(updated);

            // handleAnswerChange(userAnswer);
            setAnswerInput(questions[currentQuestionIndex + 1]?.userAnswer || '');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = (userAnswer: string) => {
        if (!userAnswer) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please provide an answer."
            });
            return;
        };

        // setQuestions((prevQuestions) =>
        //     prevQuestions.map((question) =>
        //         question._id === currentQuestion._id ? { ...question, userAnswer } : question
        //     )
        // );


        const updated = questionsRef.current.map((question) =>
            question._id === currentQuestion._id
            ? { ...question, userAnswer: userAnswer }
            : question
        );
        questionsRef.current = updated;
        setQuestions(updated);

        Alert.alert(
            "Submit Answers",
            "Are you sure you want to submit all answers?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Submit",
                    onPress: async () => {
                        // setIsSubmitting(true);
                        onSubmit();
                    }
                }
            ]
        );
    };

    const handleSkip = () => {
        Alert.alert(
            "Skip Question",
            "Are you sure you want to skip this question?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Skip",
                    onPress: () => {
                        // handleAnswerChange(currentQuestion.userAnswer || '');
                        
                        if (!isLastQuestion) {
                            handleNext('Skip Question');
                        }
                    }
                }
            ]
        );
    };

    // const handleSaveProgress = () => {
    //     setIsSaved(true);
    //     Alert.alert("Progress Saved", "Your answer has been saved successfully!");
    // };

    const handleAnswerChange = (userAnswer: string) => {
        setIsSaved(false);

        const newAnswer: questionInterface = {
            ...currentQuestion,
            userAnswer: userAnswer || ''
        };

        const allQuestions = questions;
        allQuestions[currentQuestionIndex] = newAnswer;
        setQuestions(allQuestions);
        setAnswerInput('');

        // THIS IS VERY CORRECT, BUT I NEEDED A FASTER APPROACH
        // setQuestions((prevQuestions) =>
        //     prevQuestions.map((question) =>
        //         // question._id === _id ? { ...question, userAnswer } : question
        //         question._id === currentQuestion._id ? { ...question, userAnswer } : question
        //     )
        // );
    };

    return (
        <AppSafeAreaView>
            <AppScrollView>
                <View style={styles.container}>
                    {/* Header with question counter and timer */}
                    <View style={styles.header}>
                        <AppText style={styles.counter}>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </AppText>
                        <View style={styles.timerContainer}>
                            <Ionicons name="time-outline" size={18} color="#666" />
                            <AppText style={styles.timer}>{formatTime(timeElapsed)}</AppText>
                        </View>
                    </View>

                    {/* Highlighted question container */}
                    <View style={styles.questionHighlightContainer}>
                        <AppText style={styles.questionHighlightText}>
                            {currentQuestion?.question}
                        </AppText>

                        {/* <View style={styles.questionMeta}>
                            <View style={styles.metaTag}>
                                <AppText style={styles.metaText}>{currentQuestion.position}</AppText>
                            </View>
                            <View style={styles.metaTag}>
                                <AppText style={styles.metaText}>{currentQuestion.category}</AppText>
                            </View>
                        </View> */}
                    </View>

                    {/* Answer input */}
                    <View style={styles.answerContainer}>
                        <TextInput
                            style={styles.answerInput}
                            placeholder="Type your answer here..."
                            placeholderTextColor="#999"
                            // numberOfLines={10}
                            multiline
                            // value={questions[currentQuestionIndex]?.userAnswer || ''}
                            value={answerInput}
                            onChangeText={(text) => {
                                setAnswerInput(text);

                                if (apiResponse.display) {
                                    setApiResponse(defaultApiResponse);
                                }
                            }}
                        />
                    </View>


                    {/* Action buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={handleSkip}
                        >
                            <MaterialIcons name="skip-next" size={20} color="#ff3d71" />
                            <AppText style={styles.skipButtonText}>Skip</AppText>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveProgress}
                            disabled={isSaved}
                        >
                            <Ionicons name={isSaved ? "checkmark-done" : "save-outline"} size={20} color="#6200ee" />
                            <AppText style={styles.saveButtonText}>
                                {isSaved ? "Saved" : "Save Progress"}
                            </AppText>
                        </TouchableOpacity> */}
                    </View>


                    <ApiResponse
                        display={apiResponse.display}
                        status={apiResponse.status}
                        message={apiResponse.message}
                    />

                    {/* Navigation buttons */}
                    <View style={styles.navigation}>
                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                currentQuestionIndex === 0 && styles.disabledButton
                            ]}
                            onPress={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            <AppText style={styles.navButtonText}>Previous</AppText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                isLastQuestion && styles.submitButton
                            ]}
                            disabled={isSubmitting}
                            onPress={() => isLastQuestion ? handleSubmit(answerInput || '') : handleNext(answerInput || '')}
                        >
                            <AppText style={styles.navButtonText}>
                                {isSubmitting ? "Loading..." : isLastQuestion ? "Submit" : "Next"}
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppScrollView>
                                        
            { showLoadingModal.display && 
                <LoadingModal 
                    display={showLoadingModal.display} 
                    success={showLoadingModal.success} 
                    overlayBgColor={kolors.theme.overlayBgColor}
                />
            }
        </AppSafeAreaView>
    );
};

// const { width } = Dimensions.get('window');

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    counter: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timer: {
        fontSize: 16,
        color: '#666',
        marginLeft: 5,
    },
    questionHighlightContainer: {
        backgroundColor: '#f0e6ff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#6200ee',
    },
    questionHighlightText: {
        fontSize: 18,
        lineHeight: 26,
        color: '#2d3748',
        fontWeight: '500',
    },
    questionMeta: {
        flexDirection: 'row',
        marginTop: 15,
    },
    metaTag: {
        backgroundColor: '#d9c8ff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    metaText: {
        fontSize: 12,
        color: '#6200ee',
        fontWeight: '600',
    },
    answerContainer: {
        // flex: 1,
        height: 250,
        marginBottom: 15,
    },
    answerInput: {
        flex: 1,
        fontSize: 16,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        textAlignVertical: 'top',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    skipButtonText: {
        color: '#ff3d71',
        marginLeft: 5,
        fontWeight: '600',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        opacity: 1,
    },
    saveButtonText: {
        color: '#6200ee',
        marginLeft: 5,
        fontWeight: '600',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 15,
    },
    navButton: {
        flex: 1,
        // width: width * 0.4,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#6200ee',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.5,
    },
});
