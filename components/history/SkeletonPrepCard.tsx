import React from 'react';
import { View, StyleSheet, } from 'react-native';
import LoadingSkeleton from '@/components/LoadingSkeleton';


const SkeletonPrepCard = () => {
    return (
        <View style={styles.card}>
            <LoadingSkeleton width={'70%'} height={20} />

            <View style={styles.row}>
                <LoadingSkeleton width={80} height={14} />
                <View style={{ marginLeft: 12 }}>
                    <LoadingSkeleton width={80} height={14} />
                </View>
            </View>

            <View style={styles.tagRow}>
                <LoadingSkeleton width={"30%"} height={24} borderRadius={12} />
                <LoadingSkeleton width={"30%"} height={24} borderRadius={12} />
                <LoadingSkeleton width={"30%"} height={24} borderRadius={12} />
            </View>

            <View style={{ marginTop: 16 }}>
                <LoadingSkeleton width={"100%"} height={30} />
            </View>
        </View>
    );
};

export default SkeletonPrepCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
    },
    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        gap: 12,
    },
});
