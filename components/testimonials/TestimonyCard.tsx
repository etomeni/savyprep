import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '@/components/custom/AppText';
import UserProfileImage from '@/components/custom/UserProfileImage';
import { testimonialInterface } from '@/constants/types';


interface _Props {
    testimony: testimonialInterface;
    index: number;
}

export default function TestimonyCard({
    testimony, index
} : _Props) {
    return (
        <View
            style={[
                styles.testimonialCard,
                index % 2 === 0 ? styles.evenCard : styles.oddCard
            ]}
        >
            <View style={styles.avatarContainer}>
                {/* Avatar placeholder - replace with actual images */}
                <UserProfileImage size={50} fullName={testimony.name} />

                <View>
                    <AppText style={styles.testimonialName}>{testimony.name}</AppText>
                    <AppText style={styles.testimonialRole}>{testimony.role}</AppText>
                </View>
            </View>


            <View style={styles.testimonialContent}>
                <AppText style={styles.testimonialQuote}>"{testimony.quote}"</AppText>
            </View>
        </View>        
    )
}

const styles = StyleSheet.create({
    testimonialCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        // flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    evenCard: {
        backgroundColor: '#ffffff',
    },
    oddCard: {
        backgroundColor: '#f9f5ff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 10,
    },
    
    testimonialContent: {
        flex: 1,
    },
    testimonialName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 2,
    },
    testimonialRole: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 10,
    },
    testimonialQuote: {
        fontSize: 15,
        color: '#4a5568',
        lineHeight: 22,
        fontStyle: 'italic',
    },
})