import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';


interface _Props {
    // id: number;
    prepType: "Exam" | "Interview" | "Preparation";
    summary: string;
    
    interviewsBreakdown?: {
        title: string;
        score: number;
        comment: {
            feedback: string;
            isPositive: boolean;
        }[];
    }[]
    // strengths: string[];
    // areasForImprovement: string[];
    // finalAssessment: string;
}

export default function BreakdownEvaluation({
    prepType = "Preparation", summary,
    interviewsBreakdown,
} : _Props) {

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <AppText style={styles.title}>{prepType} Feedback</AppText>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
                <AppText style={styles.summaryText}
                >{ summary }</AppText>
            </View>

            { interviewsBreakdown && prepType == "Interview" ? <>
                {/* Breakdown */}
                <AppText style={styles.sectionTitle}>Breakdown of Evaluation:</AppText>

                {/* Evaluation Items */}
                {
                    interviewsBreakdown.map((item, index) => (
                        <View key={index} style={styles.evaluationCard}>
                            <AppText style={styles.evaluationTitle}
                            >{ item.title } ({item.score}/100)</AppText>

                            { item.comment.map((comment, index) => (
                                <View key={index} style={styles.evaluationPoint}>
                                    <MaterialIcons size={16}
                                        name={comment.isPositive ? "check" : "close"}
                                        color={comment.isPositive ? "#4CAF50" : "#ff3d71"}
                                    />

                                    <AppText style={styles.evaluationText}
                                    >{ comment.feedback }</AppText>
                                </View>
                            ))}
                        </View>
                    ))
                }
            </> : <></> }

            {/* Final Verdict */}
            {/* <View style={styles.verdictCard}>
                <AppText style={styles.verdictTitle}>Final Verdict: Not Recommended</AppText>

                <AppText style={styles.verdictText}>
                    This candidate does not appear to be seriously considering the role and fails to provide meaningful responses.
                    If this is reflective of their true attitude, they would not be a good fit for most positions.
                </AppText>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        // backgroundColor: '#f8f9fa',
        marginTop: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 15,
    },
    evaluationCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    evaluationTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 12,
    },
    evaluationPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    evaluationText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
        color: '#4a5568',
        marginLeft: 8,
    },
    verdictCard: {
        backgroundColor: '#fff0f0',
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        borderLeftWidth: 4,
        borderLeftColor: '#ff3d71',
    },
    verdictTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff3d71',
        marginBottom: 10,
    },
    verdictText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4a5568',
    }
});
