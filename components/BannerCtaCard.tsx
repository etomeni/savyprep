import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { kolors } from '@/constants/Colors';
import { router } from 'expo-router';

const BannerCtaCard = () => {
    return (
        <LinearGradient
            colors={[kolors.theme.secondry, kolors.theme.primary]}
            style={styles.overlay}
        >
            <View style={styles.content}>
                <Text style={styles.headline}>Ready to transform your preparation?</Text>

                <Text style={styles.subhead}>
                    Join thousands of students and professionals who have achieved their goals with SavyPrep.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => { router.push('/account/history') }}>
                        <Text style={styles.primaryButtonText}>Get Started for Free</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { router.push('/account/Subscription') }}>
                        <Text style={styles.secondaryButtonText}>View Pricing Plans</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        borderRadius: 12,
        marginTop: 20,
    },
    content: {
        alignItems: 'center',
    },
    headline: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 36,
    },
    subhead: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 26,
        maxWidth: width * 0.9,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 400,
    },
    primaryButton: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    primaryButtonText: {
        color: kolors.theme.primary,
        fontSize: 18,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default BannerCtaCard;