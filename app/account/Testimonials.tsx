import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@/components/custom/AppText';
import TestimonyCard from '@/components/testimonials/TestimonyCard';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import KeyFeaturesScreen from '@/components/AppKeyFeatures';
import BannerCtaCard from '@/components/BannerCtaCard';
import { testimonials } from '@/constants/data';

const TestimonialsScreen = () => {

    return (
        <AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText style={styles.title}>What Our Users Say</AppText>
                        <AppText style={styles.subtitle}>
                            Don't just take our word for it. Hear from students and professionals who have transformed their preparation with SavyPrep.
                        </AppText>
                    </View>

                    <View style={{marginBottom: 20}}>
					    <KeyFeaturesScreen />
                    </View>

                    {/* Testimonials */}
                    <View style={styles.testimonialsContainer}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonyCard key={testimonial.id} index={index} testimony={testimonial} />
                        ))}
                    </View>

					<BannerCtaCard />
                </View>
            </AppScrollView>
        </AppSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
		flexDirection: "column",

		width: "100%",
		maxWidth: 600,
		// padding: 15,
		marginHorizontal: "auto",
		marginVertical: "auto",
    },
    header: {
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },

    testimonialsContainer: {
        marginBottom: 20,
    },
    
});

export default TestimonialsScreen;