import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AppText from '@/components/custom/AppText';


type Plan = {
    name: string;
    price: string;
    frequency: string;
    features: string[];
    cta: string;
    isPopular?: boolean;
};

const PlanCard = ({
    name, cta, features, frequency, price, isPopular
} : Plan) => {

    return (
        <View
            style={[
                styles.planCard,
                isPopular && styles.popularPlanCard,
            ]}
        >
            {isPopular && (
                <View style={styles.popularBadge}>
                    <AppText style={styles.popularBadgeText}>Most Popular</AppText>
                </View>
            )}

            <AppText style={styles.planName}>{name}</AppText>
            <View style={styles.priceContainer}>
                <AppText style={styles.planPrice}>{price}</AppText>
                <AppText style={styles.planFrequency}>{frequency}</AppText>
            </View>

            <View style={styles.featuresContainer}>
                {features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                        <AppText style={styles.featureText}>✓ {feature}</AppText>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={[
                    styles.ctaButton,
                    name === 'Free' ? styles.freeButton : styles.paidButton,
                ]}
            >
                <AppText
                    style={[
                        styles.ctaButtonText,
                        name === 'Free' && styles.freeButtonText,
                    ]}
                >
                    {cta}
                </AppText>
            </TouchableOpacity>
        </View>
    );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
    // plansContainer: {
    //     alignItems: 'center',
    // },
    planCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
        width: cardWidth,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    popularPlanCard: {
        borderColor: '#3182ce',
        borderWidth: 2,
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#3182ce',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    popularBadgeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    planPrice: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3182ce',
    },
    planFrequency: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 4,
        marginLeft: 4,
    },
    featuresContainer: {
        marginBottom: 24,
    },
    featureItem: {
        marginBottom: 8,
    },
    featureText: {
        fontSize: 15,
        color: '#4a5568',
    },
    ctaButton: {
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    freeButton: {
        backgroundColor: '#e2e8f0',
    },
    paidButton: {
        backgroundColor: '#3182ce',
    },
    ctaButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    freeButtonText: {
        color: '#4a5568',
    },
    paidButtonText: {
        color: '#ffffff',
    },
});

export default PlanCard;