import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { kolors } from '@/constants/Colors';
import { testimonialInterface } from '@/constants/types';
import { testimonials } from '@/constants/data';
import TestimonyCard from './TestimonyCard';

type _Props = {
    testimonial?: testimonialInterface[];
}

const { width: _SCREEN_WIDTH } = Dimensions.get('window');
const SCREEN_WIDTH = _SCREEN_WIDTH - 30; // Adjust for padding
const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds

const TestimonyCardSlides = ({ testimonial = testimonials } : _Props) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();

    // Create infinite scroll effect by duplicating the array
    const extendedFeatures = [...testimonial, ...testimonial, ...testimonial];

    const startAutoScroll = () => {
        timerRef.current = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonial.length;
            scrollTo(nextIndex);
        }, AUTO_SCROLL_INTERVAL);
    };

    const stopAutoScroll = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const scrollTo = (index: number) => {
        const offset = index * SCREEN_WIDTH + (testimonial.length * SCREEN_WIDTH);
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
        const index = Math.floor((contentOffset % (testimonial.length * SCREEN_WIDTH)) / SCREEN_WIDTH);
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
                    contentOffset={{ x: testimonial.length * SCREEN_WIDTH, y: 0 }} // Start in the middle
                >
                    {extendedFeatures.map((testimony, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.slide,
                                { width: SCREEN_WIDTH },
                                getTransformStyle(index)
                            ]}
                        >
                            <TestimonyCard
                                index={index}
                                testimony={testimony}
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

export default TestimonyCardSlides;