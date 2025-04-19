import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ShareAnalysisOverview from './FeedbackAnalysis/ShareAnalysisOverview';
import { captureRef } from 'react-native-view-shot';
// import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

import { kolors } from '@/constants/Colors';
import AppText from './custom/AppText';
import { prepFeedbackInterface } from '@/typeInterfaces/prepInterface';


interface LoadingModalProps {
    prepFeedback: prepFeedbackInterface,
    shareFeedback: boolean,
    setShareFeedback: (state: boolean) => void,
};

const ShareFeedback: React.FC<LoadingModalProps> = ({
    prepFeedback, shareFeedback, setShareFeedback
}) => {
    const feedbackReportRef = useRef<View>(null);
    // const [imageUri, setImageUri] = useState<string | null>(null);
    // const [status, requestPermission] = MediaLibrary.usePermissions();


    useEffect(() => {
        if (shareFeedback) {
            setTimeout(() => {
                handleCapture()
            }, 500);

        }
        // if (status === null) {
        //     requestPermission();
        // }
    }, [shareFeedback]);

    const handleCapture = async () => {
        try {
            const fileName = `Savy_Prep-${prepFeedback.prepTitle.replace(/ /g, '_')}_Feedback`;
            const localUri = await captureRef(feedbackReportRef, {
                // height: 440,
                quality: 1,
                fileName: fileName
            });

            if (!localUri) throw new Error('Failed to capture view.');

            if (await Sharing.isAvailableAsync()) {
                setShareFeedback(false)
                await Sharing.shareAsync(localUri);
            }

            // await MediaLibrary.saveToLibraryAsync(localUri);
        } catch (error) {
            console.error('Error capturing receipt:', error);
        } finally {
            setShareFeedback(false)
        }
    };


    return (
        <View ref={feedbackReportRef} collapsable={false} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Image
                        style={{
                            width: 30,
                            height: 30
                        }}
                        source={require('@/assets/images/savyPrep.png')}
                    />

                    <View>
                        <AppText style={styles.headerTitle}
                        >SavyPrep {prepFeedback.prepType} Feedback Report</AppText>

                        <AppText style={styles.headerSubtitle}
                        >AI-Powered Preparation for Exams & Interviews</AppText>
                    </View>
                </View>

                <View style={styles.headerDetailsContainer}>
                    <View style={styles.headerDetails}>
                        <AppText style={styles.headerDetailsTitle}>Preparation Type: </AppText>
                        <AppText style={styles.headerDetailsText}>{prepFeedback.prepType}</AppText>
                    </View>

                    <View style={styles.headerDetails}>
                        <AppText style={styles.headerDetailsTitle}>Difficulty Level: </AppText>
                        <AppText style={styles.headerDetailsText}>{prepFeedback.difficultyLevel}</AppText>
                    </View>

                    <View style={styles.headerDetails}>
                        <AppText style={styles.headerDetailsTitle}>Session Title: </AppText>
                        <AppText style={styles.headerDetailsText}>{prepFeedback.prepTitle}</AppText>
                    </View>

                    <View style={styles.headerDetails}>
                        <AppText style={styles.headerDetailsTitle}>Date: </AppText>
                        <AppText style={styles.headerDetailsText}
                        >{new Date(prepFeedback.createdAt).toLocaleString()}</AppText>
                    </View>
                </View>
            </View>


            {/* Performance Summary Progress Section */}
            <View style={styles.section}>
                {/* <AppText style={styles.sectionTitle}>Feedback, Analysis & Review</AppText> */}
                <ShareAnalysisOverview feedback={prepFeedback} />
            </View>

            {/* Final Assessment */}
            <AppText style={[styles.sectionTitle, { marginBottom: 5 }]}>Performance Summary:</AppText>
            <View style={styles.summaryCard}>
                <AppText style={styles.summaryText}
                >{prepFeedback.finalAssessment}</AppText>
            </View>


            {/* Strengths */}
            {prepFeedback.strengths.length ?
                <>
                    <AppText style={styles.sectionTitle}>Strengths:</AppText>
                    <View style={styles.summaryCard}>
                        {prepFeedback.strengths.slice(0, 2).map((strength, index) => (
                            <View key={index} style={styles.strenghtsImprovementListContainer}>
                                <Ionicons name="checkmark-done-circle" size={20} color={kolors.theme.success} />
                                <AppText style={[styles.summaryText, { flex: 1 }]}
                                >{strength}</AppText>
                            </View>
                        ))}
                    </View>
                </>
                : <></>
            }

            {/* Areas For Improvement */}
            {prepFeedback.areasForImprovement.length ?
                <>
                    <AppText style={styles.sectionTitle}>Areas For Improvement:</AppText>
                    <View style={styles.summaryCard}>
                        {prepFeedback.areasForImprovement.slice(0, 2).map((improvement, index) => (
                            <View key={index} style={styles.strenghtsImprovementListContainer}>
                                <Octicons name="dot-fill" size={20} color={kolors.theme.secondry} />
                                <AppText style={[styles.summaryText, { flex: 1 }]}
                                >{improvement}</AppText>
                            </View>
                        ))}
                    </View>
                </>
                : <></>
            }

            {/* Footer */}
            <View>
                <AppText style={styles.footerTitle}
                >Powered by SavyPrep</AppText>

                <AppText style={styles.footerSubtitle}
                >Your AI-Powered Preparation for Exams & Interviews</AppText>

                {/* <AppText style={styles.footerText}
                >Join thousands of students and professionals who have achieved their goals with SavyPrep.</AppText>

                <AppText style={styles.footerText}
                >Visit our app for more details & analysis: </AppText> */}
            </View>
        </View>
    )
}

export default ShareFeedback;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

        backgroundColor: "#eef8fc",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    header: {
        marginBottom: 10,
    },
    headerDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        gap: 5,
        marginTop: 10
    },
    headerDetails: {
        flexBasis: '48%', // Ensures two cards per row with some spacing
        // flexDirection: 'row',
        // alignItems: 'center',
        // gap: 5,
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    headerDetailsTitle: {
        fontSize: 12,
        fontWeight: "bold"
    },
    headerDetailsText: {
        fontSize: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d3748',
        textAlign: "center",
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#718096',
        textAlign: "center"
        // marginTop: 5,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 5,
    },
	imgContainer: {
		borderRadius: 10,
		overflow: "hidden",
		// backgroundColor: kolors.theme.light,
		alignItems: "center",
		justifyContent: "center",
	},



    summaryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    summaryText: {
        fontSize: 12,
        // lineHeight: 24,
        color: '#4a5568',
    },



    strenghtsImprovementListContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 5
    },


    footerTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: kolors.theme.secondry,
        textAlign: "center"
    },
    footerSubtitle: {
        fontSize: 12,
        color: kolors.theme.primary,
        textAlign: "center"
    },
    footerText: {
        fontSize: 10,
        color: "#333333",
        textAlign: "center"
    }

})