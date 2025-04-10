// import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { Collapsible } from '@/components/Collapsible';
import AppText from '@/components/custom/AppText';
import { questionInterface } from '@/typeInterfaces/prepInterface';


export default function QuestionReviewScreen({ questions }: { questions: questionInterface[] }) {
    // const [helpfulFeedback, setHelpfulFeedback] = useState<{ [key: number]: string | null }>({});
    // const handleFeedback = (questionId: number, feedback: string) => {
    //     setHelpfulFeedback(prev => ({
    //         ...prev,
    //         [questionId]: feedback
    //     }));
    // };


    return (
        <View style={styles.container}>
            <AppText style={styles.header}>Question Review</AppText>

            {questions.map((q, index) => (
                <View key={q._id} style={styles.questionContainer}>
                    <Collapsible key={q._id} 
                        title={`Q${index + 1}. -- ${q.question}`}
                        titleStyles={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: '600',
                            // color: '#2d3748'
                        }}
                    >
                        {/* <AppText style={styles.questionNumber}>Q{q.id}.</AppText>
                        <AppText style={styles.questionText}>{q.question}</AppText> */}

                        <AppText style={styles.answerLabel}>Your Answer:</AppText>
                        <View style={styles.userAnswerBox}>
                            <AppText style={styles.userAnswerText}>{q.userAnswer}</AppText>
                        </View>

                        <AppText style={styles.suggestedAnswerLabel}>Suggested Answer:</AppText>
                        <View style={styles.suggestedAnswerBox}>
                            <AppText style={styles.suggestedAnswerText}>{q.aiAnswer}</AppText>
                        </View>

                        {/* <View style={styles.feedbackContainer}>
                            <AppText style={styles.feedbackText}>Was this suggestion helpful?</AppText>
                            <View style={styles.feedbackButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.feedbackButton,
                                        helpfulFeedback[q.id] === 'helpful' && styles.selectedFeedback
                                    ]}
                                    onPress={() => handleFeedback(q.id, 'helpful')}
                                >
                                    <MaterialIcons
                                        name="thumb-up"
                                        size={18}
                                        color={helpfulFeedback[q.id] === 'helpful' ? '#4CAF50' : '#718096'}
                                    />
                                    <AppText style={[
                                        styles.feedbackButtonText,
                                        helpfulFeedback[q.id] === 'helpful' && styles.selectedFeedbackText
                                    ]}>
                                        Helpful
                                    </AppText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.feedbackButton,
                                        helpfulFeedback[q.id] === 'not-helpful' && styles.selectedFeedback
                                    ]}
                                    onPress={() => handleFeedback(q.id, 'not-helpful')}
                                >
                                    <MaterialIcons
                                        name="thumb-down"
                                        size={18}
                                        color={helpfulFeedback[q.id] === 'not-helpful' ? '#ff3d71' : '#718096'}
                                    />
                                    <AppText style={[
                                        styles.feedbackButtonText,
                                        helpfulFeedback[q.id] === 'not-helpful' && styles.selectedFeedbackText
                                    ]}>
                                        Not Helpful
                                    </AppText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.feedbackButton}
                                    onPress={() => console.log('Discuss pressed')}
                                >
                                    <MaterialIcons name="forum" size={18} color="#6200ee" />
                                    <AppText style={[styles.feedbackButtonText, { color: '#6200ee' }]}>
                                        Discuss
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        </View> */}

                        {/* {q.id < questions.length && <View style={styles.divider} />} */}
                    </Collapsible>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        marginVertical: 20,
        // backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 15,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 8,
    },
    questionNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 5,
    },
    questionText: {
        fontSize: 16,
        color: '#4a5568',
        lineHeight: 24,
        marginBottom: 15,
    },
    answerLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 5,
        marginTop: 10,
    },
    userAnswerBox: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    userAnswerText: {
        fontSize: 15,
        color: '#4a5568',
        lineHeight: 22,
    },
    suggestedAnswerLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 5,
    },
    suggestedAnswerBox: {
        backgroundColor: '#f0f7ff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#d0e3ff',
    },
    suggestedAnswerText: {
        fontSize: 15,
        color: '#2d3748',
        lineHeight: 22,
    },
    feedbackContainer: {
        marginTop: 10,
    },
    feedbackText: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 10,
    },
    feedbackButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    feedbackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    feedbackButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#718096',
    },
    selectedFeedback: {
        backgroundColor: '#f5f5f5',
        borderColor: '#d0d0d0',
    },
    selectedFeedbackText: {
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 25,
    },
});