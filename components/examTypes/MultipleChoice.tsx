import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import AppText from '@/components/custom/AppText';
import ApiResponse from '@/components/form/ApiResponse';
import { kolors } from '@/constants/Colors';
import { router } from 'expo-router';
import { usePrepStore } from '@/state/prepStore';
import { defaultApiResponse, formatTime, pauseExecution } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { prepFeedbackInterface, questionInterface } from '@/typeInterfaces/prepInterface';
import LoadingModal from '../custom/LoadingModal';



interface _Props {
    showAnswer?: boolean;
    studyType: "multiple_choice" | "true_false"
}

const MultipleChoice = ({ studyType, showAnswer = false } : _Props) => {
    const prepData = usePrepStore((state) => state.prepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const _setPrepFeedback = usePrepStore((state) => state._setPrepFeedback);
    // const _setAppLoading = useSettingStore((state) => state._setAppLoading);
    const [showLoadingModal, setShowLoadingModal] = useState({
        display: false,
        success: false,
    });

    const [questions, setQuestions] = useState<questionInterface[]>(
        prepData.transcript.map((question) => ({ ...question, userAnswer: '' }))
    );
    const questionsRef = useRef<questionInterface[]>([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');

    const [timeElapsed, setTimeElapsed] = useState(0); // seconds
    const [isSaved, setIsSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

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


    const onSubmit = async () => {
        // console.log(questions);
        setShowLoadingModal({ display: true, success: false });
        setIsSubmitting(true);
        
        await pauseExecution(3000); // 3 secs
        
		try {
			const response = (await apiClient.post(`/prep/generate-exams-feedback`,
                {
                    prepId: prepData._id,
                    transcript: questionsRef.current || questions,
                    timeElapsed
                }
            )).data;
            // console.log(response);

            const prep: prepFeedbackInterface = response.result.feedback;
            _setPrepFeedback(prep);

            setShowLoadingModal({display: false, success: false})
            setIsSubmitting(false);

            router.push({
                pathname: "/account/FeedbackAnalysis",
                params: { prepId: prepData._id }
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

    const handleOptionSelect = (selectedAnswer: string) => {
        setApiResponse(defaultApiResponse);

        setSelectedOption(selectedAnswer);
    };

    const handleNextQuestion = async (selectedAnswer: string) => {
        setApiResponse(defaultApiResponse);
        
        if (!selectedAnswer) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please select an option."
            });
            return;
        };

        // setQuestions((prevQuestions) =>
        //     prevQuestions.map((question) =>
        //         question._id === currentQuestion._id ? { ...question, userAnswer: selectedAnswer } : question
        //     )
        // );
        // // the pause execution function is to allow the 
        // // setQuestions to set the current answer before proceeding
        // await pauseExecution(1000); // 1 secs



        const updated = questionsRef.current.map((question) =>
            question._id === currentQuestion._id
            ? { ...question, userAnswer: selectedAnswer }
            : question
        );
        
        questionsRef.current = updated;
        setQuestions(updated);
          

        if (currentQuestionIndex < questions.length - 1) {
            // setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsSaved(false);

            setSelectedOption(questions[currentQuestionIndex + 1]?.userAnswer || '');
            // setSelectedOption('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Handle quiz completion
            console.log("Quiz completed");

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
        }
    };

    const handlePreviousQuestion = () => {
        setApiResponse(defaultApiResponse);

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsSaved(false);

            setSelectedOption(questions[currentQuestionIndex -1]?.userAnswer || '');
        }
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
                        handleNextQuestion('Skip Question');
                    }
                }
            ]
        );
    };


    return (
        <View style={styles.container}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <AppText style={styles.progressText}>
                        {currentQuestionIndex + 1} of {questions.length}
                    </AppText>

                    <View style={styles.timerContainer}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <AppText style={styles.timer}>{formatTime(timeElapsed)}</AppText>
                    </View>
                </View>


                <View style={styles.progressBar}>
                    <View style={[
                        styles.progressFill,
                        { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                    ]} />
                </View>
            </View>

            {/* Question */}
            <AppText style={styles.questionText}>{currentQuestion.question}</AppText>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {
                    currentQuestion.options ?
                        currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedOption == option && styles.selectedOption,
                                    showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOption,

                                    showAnswer && selectedOption == option &&
                                    selectedOption != currentQuestion.aiAnswer && styles.incorrectOption
                                ]}
                                onPress={() => handleOptionSelect(option)}
                                disabled={showAnswer}
                            >
                                <AppText style={[
                                    styles.optionText,
                                    selectedOption == option && styles.selectedOptionText,
                                    showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOptionText,

                                    showAnswer && selectedOption == option &&
                                    selectedOption != currentQuestion.aiAnswer && styles.incorrectOptionText
                                ]}>{ option }</AppText>

                                {showAnswer && selectedOption == currentQuestion.aiAnswer && (
                                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
                                )}

                                {showAnswer && selectedOption == option &&
                                    selectedOption != currentQuestion.aiAnswer && (
                                        <MaterialIcons name="cancel" size={24} color="#ff3d71" style={styles.optionIcon} />
                                )}
                            </TouchableOpacity>
                        ))
                    : <></>
                }

                { studyType == "true_false" ?
                    <>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedOption == "True" && styles.selectedOption,
                                showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOption,

                                showAnswer && selectedOption == "True" &&
                                selectedOption != currentQuestion.aiAnswer && styles.incorrectOption
                            ]}
                            onPress={() => handleOptionSelect("True")}
                            disabled={showAnswer}
                        >
                            <AppText style={[
                                styles.optionText,
                                selectedOption == "True" && styles.selectedOptionText,
                                showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOptionText,

                                showAnswer && selectedOption == "True" &&
                                selectedOption != currentQuestion.aiAnswer && styles.incorrectOptionText
                            ]}>True</AppText>

                            {showAnswer && selectedOption == currentQuestion.aiAnswer && (
                                <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
                            )}

                            {showAnswer && selectedOption == "True" &&
                                selectedOption != currentQuestion.aiAnswer && (
                                    <MaterialIcons name="cancel" size={24} color="#ff3d71" style={styles.optionIcon} />
                            )}
                        </TouchableOpacity>
                            
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedOption == "False" && styles.selectedOption,
                                showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOption,

                                showAnswer && selectedOption == "False" &&
                                selectedOption != currentQuestion.aiAnswer && styles.incorrectOption
                            ]}
                            onPress={() => handleOptionSelect("False")}
                            disabled={showAnswer}
                        >
                            <AppText style={[
                                styles.optionText,
                                selectedOption == "False" && styles.selectedOptionText,
                                showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOptionText,

                                showAnswer && selectedOption == "False" &&
                                selectedOption != currentQuestion.aiAnswer && styles.incorrectOptionText
                            ]}>False</AppText>

                            {showAnswer && selectedOption == currentQuestion.aiAnswer && (
                                <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
                            )}

                            {showAnswer && selectedOption == "False" &&
                                selectedOption != currentQuestion.aiAnswer && (
                                    <MaterialIcons name="cancel" size={24} color="#ff3d71" style={styles.optionIcon} />
                            )}
                        </TouchableOpacity>
                    </>
                    : <></>
                }

                {/* <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedOption == "Not Sure?" && styles.selectedOption,
                        showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOption,

                        showAnswer && selectedOption == "Not Sure?" &&
                        selectedOption != currentQuestion.aiAnswer && styles.incorrectOption
                    ]}
                    onPress={() => handleOptionSelect("Not Sure?")}
                    disabled={showAnswer}
                >
                    <AppText style={[
                        styles.optionText,
                        selectedOption == "Not Sure?" && styles.selectedOptionText,
                        showAnswer && selectedOption == currentQuestion.aiAnswer && styles.correctOptionText,

                        showAnswer && selectedOption == "Not Sure?" &&
                        selectedOption != currentQuestion.aiAnswer && styles.incorrectOptionText
                    ]}>Not Sure?</AppText>

                    {showAnswer && selectedOption == currentQuestion.aiAnswer && (
                        <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
                    )}

                    {showAnswer && selectedOption == "Not Sure?" &&
                        selectedOption != currentQuestion.aiAnswer && (
                            <MaterialIcons name="cancel" size={24} color="#ff3d71" style={styles.optionIcon} />
                    )}
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
                    onPress={handlePreviousQuestion}
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
                    onPress={() => handleNextQuestion(selectedOption)}
                    // onPress={() => isLastQuestion ? handleSubmit(answerInput || '') : handleNextQuestion(answerInput || '')}
                >
                    <AppText style={styles.navButtonText}>
                        { isSubmitting ? "Loading..." : isLastQuestion ? 'Finish' : 'Next'}
                    </AppText>
                </TouchableOpacity>
            </View>


                            
            { showLoadingModal.display && 
                <LoadingModal 
                    display={showLoadingModal.display} 
                    success={showLoadingModal.success} 
                    overlayBgColor={kolors.theme.overlayBgColor}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        // padding: 20,
        // paddingBottom: 40,
        // backgroundColor: '#f8f9fa',
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
    progressContainer: {
        marginBottom: 25,
    },
    progressText: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 8,
        textAlign: 'center',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: kolors.theme.primary, // '#6200ee',
        borderRadius: 3,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 25,
        lineHeight: 28,
    },
    optionsContainer: {
        marginBottom: 30,
    },
    optionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedOption: {
        backgroundColor: kolors.theme.primary, // '#6200ee',
        // borderColor: '#6200ee',
    },
    correctOption: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4CAF50',
    },
    incorrectOption: {
        backgroundColor: '#ffebee',
        borderColor: '#ff3d71',
    },
    optionText: {
        fontSize: 16,
        color: '#4a5568',
        flex: 1,
    },
    selectedOptionText: {
        color: '#ffffff',
    },
    correctOptionText: {
        color: '#2d3748',
    },
    incorrectOptionText: {
        color: '#2d3748',
    },
    optionIcon: {
        marginLeft: 10,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navButton: {
        width: '47%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#6200ee',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default MultipleChoice;