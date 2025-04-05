import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';

interface Question {
    id: number;
    text: string;
    position: string;
    category: string;
}

const QuestionScreen = () => {
    // Demo questions data
    const demoQuestions: Question[] = [
        {
            id: 1,
            text: "Explain the difference between let, const, and var in JavaScript.",
            position: "Frontend Developer",
            category: "JavaScript"
        },
        {
            id: 2,
            text: "How would you optimize a React application for performance?",
            position: "React Developer",
            category: "React"
        },
        {
            id: 3,
            text: "Describe your approach to state management in large applications.",
            position: "Senior Developer",
            category: "Architecture"
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const currentQuestion = demoQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === demoQuestions.length - 1;

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Auto-update timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsSaved(false);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < demoQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsSaved(false);
        }
    };

    const handleSubmit = () => {
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
                    onPress: () => {
                        Alert.alert("Success", "Your answers have been submitted successfully!");
                        // In a real app, you would navigate to results screen here
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
                        setAnswers(prev => ({ ...prev, [currentQuestion.id]: '' }));
                        if (!isLastQuestion) {
                            handleNext();
                        }
                    }
                }
            ]
        );
    };

    const handleSaveProgress = () => {
        setIsSaved(true);
        Alert.alert("Progress Saved", "Your answer has been saved successfully!");
    };

    const handleAnswerChange = (text: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: text
        }));
    };

    return (
        <AppSafeAreaView>
            <AppScrollView>
                <View style={styles.container}>
                    {/* Header with question counter and timer */}
                    <View style={styles.header}>
                        <AppText style={styles.counter}>
                            Question {currentQuestionIndex + 1} of {demoQuestions.length}
                        </AppText>
                        <View style={styles.timerContainer}>
                            <Ionicons name="time-outline" size={18} color="#666" />
                            <AppText style={styles.timer}>{formatTime(timeElapsed)}</AppText>
                        </View>
                    </View>

                    {/* Highlighted question container */}
                    <View style={styles.questionHighlightContainer}>
                        <AppText style={styles.questionHighlightText}>
                            {currentQuestion.text}
                        </AppText>
                        <View style={styles.questionMeta}>
                            <View style={styles.metaTag}>
                                <AppText style={styles.metaText}>{currentQuestion.position}</AppText>
                            </View>
                            <View style={styles.metaTag}>
                                <AppText style={styles.metaText}>{currentQuestion.category}</AppText>
                            </View>
                        </View>
                    </View>

                    {/* Answer input */}
                    <View style={styles.answerContainer}>
                        <TextInput
                            style={styles.answerInput}
                            placeholder="Type your answer here..."
                            placeholderTextColor="#999"
                            multiline
                            value={answers[currentQuestion.id] || ''}
                            onChangeText={handleAnswerChange}
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

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveProgress}
                            disabled={isSaved}
                        >
                            <Ionicons name={isSaved ? "checkmark-done" : "save-outline"} size={20} color="#6200ee" />
                            <AppText style={styles.saveButtonText}>
                                {isSaved ? "Saved" : "Save Progress"}
                            </AppText>
                        </TouchableOpacity>
                    </View>

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
                            onPress={isLastQuestion ? handleSubmit : handleNext}
                        >
                            <AppText style={styles.navButtonText}>
                                {isLastQuestion ? "Submit" : "Next"}
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppScrollView>
        </AppSafeAreaView>
    );
};

const { width } = Dimensions.get('window');

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
        flex: 1,
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
    },
    navButton: {
        width: width * 0.4,
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

export default QuestionScreen;