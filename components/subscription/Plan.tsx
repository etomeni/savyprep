import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import index from '@/app';
import PlanCard from './PlanCard';

type Plan = {
    name: string;
    price: string;
    frequency: string;
    features: string[];
    cta: string;
    isPopular?: boolean;
};

const PricingScreen = () => {
    const tabs = ['free', 'standard', 'premium'];
    const [activeTab, setActiveTab] = useState('free');

    const monthlyPlans: Plan[] = [
        {
            name: 'Free',
            price: '$0',
            frequency: '',
            features: [
                '5 Exam preparations per month',
                '5 Interview preparations per month',
                'Up to 10 questions per session',
                'Basic document analysis',
                'Standard AI model',
            ],
            cta: 'Get Started',
        },
        {
            name: 'Standard',
            price: '$12',
            frequency: '/month',
            features: [
                '20 Exam preparations per month',
                '20 Interview preparations per month',
                'Up to 20 questions per session',
                'Advanced document analysis',
                'Enhanced AI model',
                'Priority support',
                'Advanced analytics',
                'Custom question types',
            ],
            cta: 'Upgrade to Standard',
            isPopular: true,
        },
        {
            name: 'Premium',
            price: '$29',
            frequency: '/month',
            features: [
                'Unlimited exam preparations',
                'Unlimited interview preparations',
                'Up to 30 questions per session',
                'Premium document analysis',
                'State-of-the-art AI model',
                'Priority support',
                'Advanced analytics',
                'Custom question types',
            ],
            cta: 'Upgrade to Premium',
        },
    ];

    const getActivePlan = () => {
        if (activeTab == "free") {
            return monthlyPlans[0];
        } else if (activeTab == "standard") {
            return monthlyPlans[1];
        } else if (activeTab == "premium") {
            return monthlyPlans[2];
        } else {
            return monthlyPlans[0];
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Choose Your Plan</Text>
                <Text style={styles.subtitle}>
                    Select the perfect plan for your preparation needs. Upgrade anytime as your requirements grow.
                </Text>

                <View style={styles.tabContainer}>
                    { tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, activeTab == tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab == tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    )) }
                </View>

                <View style={styles.plansContainer}>
                    <PlanCard 
                        name={getActivePlan().name} 
                        price={getActivePlan().price} 
                        frequency={getActivePlan().frequency} 
                        features={getActivePlan().features} 
                        cta={getActivePlan().cta}
                        isPopular={getActivePlan().isPopular}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#2d3748',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#718096',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 16,
        color: '#4a5568',
        fontWeight: '500',
        textTransform: "capitalize"
    },
    activeTabText: {
        color: '#3182ce',
        fontWeight: '600',
    },
    plansContainer: {
        alignItems: 'center',
    },
});

export default PricingScreen;