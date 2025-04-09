import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

const MultipleChoice = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const questions: Question[] = [
        {
            id: 1,
            text: "What is the primary purpose of including client information on a business receipt?",
            options: [
                "To facilitate future communications and transactions",
                "To provide a record for tax audits only",
                "To ensure the receipt can be reused",
                "To comply with legal regulations on advertising",
                "Not Sure?"
            ],
            correctAnswer: 0
        },
        {
            id: 2,
            text: "How does the inclusion of tax details on a receipt impact consumer behavior?",
            options: [
                "It discourages consumers from making larger purchases",
                "It provides transparency and builds trust with consumers",
                "It complicates the purchasing process for consumers",
                "It primarily serves as a legal requirement without impact",
                "Not Sure?"
            ],
            correctAnswer: 1
        },
        // Add more questions as needed
    ];

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        setSelectedOption(index);
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowAnswer(false);
        } else {
            // Handle quiz completion
            console.log("Quiz completed");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setShowAnswer(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
                <AppText style={styles.progressText}>
                    {currentQuestionIndex + 1} of {questions.length}
                </AppText>
                <View style={styles.progressBar}>
                    <View style={[
                        styles.progressFill,
                        { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                    ]} />
                </View>
            </View>

            {/* Question */}
            <AppText style={styles.questionText}>{currentQuestion.text}</AppText>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOption === index && styles.selectedOption,
                            showAnswer && index === currentQuestion.correctAnswer && styles.correctOption,
                            showAnswer && selectedOption === index &&
                            selectedOption !== currentQuestion.correctAnswer && styles.incorrectOption
                        ]}
                        onPress={() => handleOptionSelect(index)}
                        disabled={showAnswer}
                    >
                        <AppText style={[
                            styles.optionText,
                            selectedOption === index && styles.selectedOptionText,
                            showAnswer && index === currentQuestion.correctAnswer && styles.correctOptionText,
                            showAnswer && selectedOption === index &&
                            selectedOption !== currentQuestion.correctAnswer && styles.incorrectOptionText
                        ]}>
                            {option}
                        </AppText>
                        {showAnswer && index === currentQuestion.correctAnswer && (
                            <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.optionIcon} />
                        )}
                        {showAnswer && selectedOption === index &&
                            selectedOption !== currentQuestion.correctAnswer && (
                                <MaterialIcons name="cancel" size={24} color="#ff3d71" style={styles.optionIcon} />
                            )}
                    </TouchableOpacity>
                ))}
            </View>

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
                    style={styles.navButton}
                    onPress={handleNextQuestion}
                >
                    <AppText style={styles.navButtonText}>
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </AppText>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#6200ee',
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
        backgroundColor: '#6200ee',
        borderColor: '#6200ee',
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
        width: '48%',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#6200ee',
        alignItems: 'center',
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