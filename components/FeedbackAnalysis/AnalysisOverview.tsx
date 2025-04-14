import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';


interface _Props {
    prepType: "Exam" | "Interview";
    totalScore: number;
    completion: number;
    totalQuestions: number;
    answeredQuestions: number;
    containerStyle?: ViewStyle;
}

export default function AnalysisOverview({
    prepType, totalScore, completion, totalQuestions, answeredQuestions,
    containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
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
                size={120}
                progress={totalScore / 100}
                showsText={true}
                formatText={() => `${totalScore}%`}
                color={handleProgressColor(totalScore)} // "#6200ee"
                thickness={8}
                borderWidth={0}
                unfilledColor="#e2e8f0"
                textStyle={styles.progressText}
            />

            <View style={styles.statsContainer}>
                {/* {
                    prepType == "Exam" ? 
                        <View style={styles.statItem}>
                            <AppText style={styles.statNumber}>
                                {getActualScore(totalScore, totalQuestions) }/{totalQuestions}
                            </AppText>
                            <AppText style={styles.statLabel}>Score</AppText>
                        </View>
                    : 
                        <View style={styles.statItem}>
                            <AppText style={styles.statNumber}>{completion}%</AppText>
                            <AppText style={styles.statLabel}>Score</AppText>
                        </View>
                } */}

                <View style={styles.statItem}>
                    <AppText style={styles.statNumber}>
                        {getActualScore(totalScore, totalQuestions) }/{totalQuestions}
                    </AppText>
                    <AppText style={styles.statLabel}>Score</AppText>
                </View>


                <View style={styles.statItem}>
                    <AppText style={styles.statNumber}>{totalQuestions}</AppText>
                    <AppText style={styles.statLabel}>Questions</AppText>
                </View>

                <View style={styles.statItem}>
                    <AppText style={styles.statNumber}>{answeredQuestions}</AppText>
                    <AppText style={styles.statLabel}>Answered</AppText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    progressText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    statsContainer: {
        flex: 1,
        marginLeft: 20,
    },
    statItem: {
        marginBottom: 15,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    statLabel: {
        fontSize: 16,
        color: '#718096',
    }
})