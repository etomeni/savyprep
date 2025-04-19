import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
import { prepFeedbackInterface } from '@/typeInterfaces/prepInterface';


interface _Props {
    containerStyle?: ViewStyle;
    feedback: prepFeedbackInterface
}

export default function ShareAnalysisOverview({
    feedback,
    containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    }
} : _Props) {

    const handleProgressColor = (score: number) => {
        if (score >= 80) {
            return '#38a169'; // Green
        } else if (score >= 60) {
            return kolors.theme.secondry
        } else if (score >= 50) {
            return "#6200ee"; // Blue
        } else if (score >= 40) {
            return '#f6ad55'; // Yellow
        } else {
            return '#e53e3e'; // Red
        }
    };

    function getActualScore(percentage: number, totalQuestions: number) {
        const score = (percentage / 100) * totalQuestions;
        return Number(score.toFixed(1)); // round to 2 decimal places
        // return Math.round(score); // round to nearest whole number
    }

    return (
        <View style={[styles.progressContainer, containerStyle]}>
            <Progress.Circle
                size={70}
                progress={feedback.totalScore / 100}
                showsText={true}
                formatText={() => `${feedback.totalScore}%`}
                color={handleProgressColor(feedback.totalScore)}
                thickness={6}
                borderWidth={0}
                unfilledColor="#e2e8f0"
                textStyle={styles.progressText}
            />

            <View style={styles.statsContainer}>

                { feedback.prepType == "Exam" ? 
                    <View style={styles.statItem}>
                        <AppText style={styles.statNumber}>
                            {getActualScore(feedback.totalScore, feedback.totalQuestions) }/{feedback.totalQuestions}
                        </AppText>
                        <AppText style={styles.statLabel}>Score</AppText>
                    </View>
                    : <></>
                }

                <View style={styles.statItem}>
                    <AppText style={styles.statNumber}>{feedback.totalQuestions}</AppText>
                    <AppText style={styles.statLabel}>Questions</AppText>
                </View>

                <View style={styles.statItem}>
                    <AppText style={styles.statNumber}>{feedback.answeredQuestions}</AppText>
                    <AppText style={styles.statLabel}>Answered</AppText>
                </View>
            </View>

            <View>
                { feedback.feedbackBreakdowns && feedback.feedbackBreakdowns.length ?
                    feedback.feedbackBreakdowns.map((breakdowns, index) => (
                        <View key={index} style={styles.scoreBreakdownContainer}>
                            <AppText style={styles.scoreBreakdownTitle}>{breakdowns.title}: </AppText>
                            <Progress.Bar
                                progress={breakdowns.score / 100}
                                color={handleProgressColor(feedback.totalScore)}
                                borderWidth={0}
                                unfilledColor="#e2e8f0"
                                height={3}
                            />
                        </View>
                    ))
                    : <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    statsContainer: {
        flex: 1,
        marginLeft: 15,
    },
    statItem: {
        marginBottom: 5,
    },
    statNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    statLabel: {
        fontSize: 10,
        color: '#718096',
    },
    scoreBreakdownContainer: {
        marginBottom: 5
    },
    scoreBreakdownTitle: {
        fontSize: 10, 
        marginBottom: 2
    }
})