import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const KeyFeaturesScreen = () => {
    const features = [
        {
            title: "Exam Preparation",
            description: "Upload your study materials and get AI-generated questions to test your knowledge.",
            icon: "book-education"
        },
        {
            title: "Interview Preparation",
            description: "Practice with questions tailored to your target role, experience level, and technologies.",
            icon: "account-voice"
        },
        {
            title: "Performance Analytics",
            description: "Track your progress over time and identify areas that need more focus.",
            icon: "chart-line"
        },
        {
            title: "Advanced AI Technology",
            description: "Our AI engine understands context and generates highly relevant questions.",
            icon: "robot"
        },
        {
            title: "Privacy & Security",
            description: "Your documents and data are securely encrypted and never shared with third parties.",
            icon: "shield-lock"
        },
        {
            title: "Comprehensive Feedback",
            description: "Get detailed explanations and feedback on your answers to improve faster.",
            icon: "comment-text-multiple"
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Key Features</Text>
            </View>

            <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                    <View key={index} style={styles.featureCard}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={feature.icon}
                                size={28}
                                color="#6200ee"
                            />
                        </View>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureDescription}>{feature.description}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginBottom: 25,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    featuresContainer: {
        marginTop: 10,
    },
    featureCard: {
        backgroundColor: '#ffffff',
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

export default KeyFeaturesScreen;