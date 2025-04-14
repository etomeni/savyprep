import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingSkeleton from '@/components/LoadingSkeleton';


const SkeletonFeedback = () => {

    return (
        <View style={styles.container}>
            <LoadingSkeleton width={'60%'} height={24} />
            <LoadingSkeleton width={'90%'} height={18} />

            {/* Score block */}
            <View style={styles.scoreCard}>
                <LoadingSkeleton width={60} height={60} borderRadius={30} />
                <View style={{ marginLeft: 16 }}>
                    <LoadingSkeleton width={40} height={16} />
                    <LoadingSkeleton width={80} height={14} />
                    <LoadingSkeleton width={80} height={14} />
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <LoadingSkeleton width={"30%"} height={30} borderRadius={8} />
                <LoadingSkeleton width={"30%"} height={30} borderRadius={8} />
                <LoadingSkeleton width={"30%"} height={30} borderRadius={8} />
            </View>

            {/* Feedback text */}
            <View style={styles.feedbackBox}>
                <LoadingSkeleton width={'90%'} height={16} />
                <LoadingSkeleton width={'95%'} height={16} />
                <LoadingSkeleton width={'80%'} height={16} />
                <LoadingSkeleton width={'60%'} height={16} />
            </View>

            {/* Feedback text */}
            <View style={styles.feedbackBox}>
                <LoadingSkeleton width={'90%'} height={16} />
                <LoadingSkeleton width={'95%'} height={16} />
                <LoadingSkeleton width={'80%'} height={16} />
                <LoadingSkeleton width={'60%'} height={16} />
            </View>
        </View>
    );
};

export default SkeletonFeedback;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: '#eef7f9',
        flex: 1,
    },
    scoreCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    feedbackBox: {
        marginTop: 30,
        backgroundColor: '#fff',
        padding: 15, 
        borderRadius: 12
    },
});
