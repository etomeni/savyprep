import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';

type featuresInterface = {
    title: string;
    description: string;    
    color: string;    
    // icon: "book-education" | "account-voice" | "chart-line" | "robot" | "shield-lock" | "comment-text-multiple" 
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'],
};


const KeyFeaturesCard = ({
    color, description, icon, title
} : featuresInterface) => {

    return (
        <View style={[styles.featureCard, { borderTopColor: color }]}>
            <View style={styles.headerContainer}>
                <View style={[styles.iconContainer, { backgroundColor: `${color}40` }]}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={28}
                        color={color}
                    />
                </View>
                <AppText style={styles.featureTitle}>{title}</AppText>
            </View>

            <AppText style={styles.featureDescription}>{description}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    featureCard: {
        backgroundColor: '#eff6ff',
        borderTopWidth: 10,
        borderTopColor: kolors.theme.primary,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    iconContainer: {
        backgroundColor: '#f0e6ff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 8,
    },
    featureDescription: {
        fontSize: 15,
        color: '#4a5568',
        lineHeight: 22,
    },
});

export default KeyFeaturesCard;