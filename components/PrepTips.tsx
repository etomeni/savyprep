import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';


type _Props = {
    prepType: 'Exam Prep' | 'Interview Prep',
};

const PreparationTips = ({
    prepType
} : _Props) => {
    const interviewHeaderTips = "Interview preparation tips";
    const interviewTips = [
        "Be specific about the role and technologies for more relevant questions",
        "Adding the job description helps generate questions specific to that position",
        "Practice answering out loud for better retention",
        "For technical roles, prepare to explain your thought process clearly"
    ];

    const examsHeaderTips = "Tips for better results";
    const examsTips = [
        "Upload clear, well-organized study materials",
        "Use materials with headings and structured content",
        "For best results, upload multiple documents that cover different aspects of the subject",
        "The higher the document quality, the better the generated questions"
    ];

    let title = '';
    let tips: string[] = [];

    if (prepType == "Interview Prep") {
        title = interviewHeaderTips;
        tips = interviewTips;
    } else if (prepType == "Exam Prep") {
        title = examsHeaderTips;
        tips = examsTips;
    } else {
        title = "Preparation tips";
        tips = [];
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerText}>{title}</AppText>
            </View>

            <View style={styles.tipsContainer}>
                {tips.map((tip, index) => (
                    <View key={index} style={styles.tipItem}>
                        <MaterialIcons name="check-circle" size={20} color={kolors.theme.secondry} style={styles.bulletIcon} />
                        <AppText style={styles.tipText}>{tip}</AppText>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 25,
    },
    header: {
        // marginBottom: 25,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    tipsContainer: {
        marginTop: 15,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    bulletIcon: {
        marginRight: 10,
        // marginTop: 3,
    },
    tipText: {
        flex: 1,
        fontSize: 12,
        // lineHeight: 24,
        color: '#4a5568',
    },
});

export default PreparationTips;