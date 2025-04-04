import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { kolors } from '@/constants/Colors';
import KeyFeaturesCard from '@/components/AppKeyFeaturesCard';


type featuresInterface = {
    title: string;
    description: string;
    color: string;
    icon: "book-education" | "account-voice" | "chart-line" | "robot" | "shield-lock" | "comment-text-multiple"
};

const { width: _SCREEN_WIDTH } = Dimensions.get('window');
const SCREEN_WIDTH = _SCREEN_WIDTH - 30; // Adjust for padding
const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds


const KeyFeaturesScreen = () => {
    const features: featuresInterface[] = [
        {
            title: "Exam Preparation",
            description: "Upload your study materials and get AI-generated questions to test your knowledge.",
            icon: "book-education",
            color: kolors.theme.secondry
        },
        {
            title: "Interview Preparation",
            description: "Practice with questions tailored to your target role, experience level, and technologies.",
            icon: "account-voice",
            color: kolors.theme.primary
        },
        {
            title: "Performance Analytics",
            description: "Track your progress over time and identify areas that need more focus.",
            icon: "chart-line",
            color: '#22c55e'
        },
        {
            title: "Advanced AI Technology",
            description: "Our AI engine understands context and generates highly relevant questions.",
            icon: "robot",
            color: '#a855f7'
        },
        {
            title: "Privacy & Security",
            description: "Your documents and data are securely encrypted and never shared with third parties.",
            icon: "shield-lock",
            color: '#3b82f6'
        },
        {
            title: "Comprehensive Feedback",
            description: "Get detailed explanations and feedback on your answers to improve faster.",
            icon: "comment-text-multiple",
            color: '#f59e0b'
        }
    ];

    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();

    // Create infinite scroll effect by duplicating the array
    const extendedFeatures = [...features, ...features, ...features];

    const startAutoScroll = () => {
        timerRef.current = setInterval(() => {
            const nextIndex = (currentIndex + 1) % features.length;
            scrollTo(nextIndex);
        }, AUTO_SCROLL_INTERVAL);
    };

    const stopAutoScroll = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const scrollTo = (index: number) => {
        const offset = index * SCREEN_WIDTH + (features.length * SCREEN_WIDTH);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: offset,
                animated: true
            });
        }
        setCurrentIndex(index);
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [currentIndex]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handleScrollEnd = (event: any) => {
        stopAutoScroll();
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor((contentOffset % (features.length * SCREEN_WIDTH)) / SCREEN_WIDTH);
        setCurrentIndex(index);
        startAutoScroll();
    };

    // Calculate the translateX for infinite scrolling
    const getTransformStyle = (index: number) => {
        const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
        ];

        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [SCREEN_WIDTH * 0.5, 0, -SCREEN_WIDTH * 0.5],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });

        return { transform: [{ translateX }], opacity };
    };


    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleScrollEnd}
                    scrollEventThrottle={16}
                    contentOffset={{ x: features.length * SCREEN_WIDTH, y: 0 }} // Start in the middle
                >
                    {extendedFeatures.map((feature, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.slide,
                                { width: SCREEN_WIDTH },
                                getTransformStyle(index)
                            ]}
                        >
                            <KeyFeaturesCard
                                title={feature.title}
                                description={feature.description}
                                color={feature.color}
                                icon={feature.icon}
                            />
                        </Animated.View>
                    ))}
                </Animated.ScrollView>
            </View>

            {/* <View style={styles.pagination}>
                {features.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentIndex === index && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View> */}

            {/* <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                    <KeyFeaturesCard key={index}
                        title={feature.title}
                        description={feature.description}
                        color={feature.color}
                        icon={feature.icon}
                    />
                ))}
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f8f9fa',
        marginTop: 20,
    },
    // featuresContainer: {
    //     marginTop: 10,
    // },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    slide: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 30,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 40,
        // left: 0,
        // right: 0,
        backgroundColor: 'red'
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cbd5e0',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: kolors.theme.primary,
        width: 20,
    },

});

export default KeyFeaturesScreen;