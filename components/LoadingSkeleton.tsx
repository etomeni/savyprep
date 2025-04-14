import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


export default function LoadingSkeleton(
    { width, height, borderRadius = 8 } : {
        width: any, // number | string;
        height: number;
        borderRadius?: number;
    }
) {
    const shimmerTranslate = useSharedValue(-SCREEN_WIDTH);

    useEffect(() => {
        shimmerTranslate.value = withRepeat(
            withTiming(SCREEN_WIDTH, { duration: 1200 }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: shimmerTranslate.value }],
        };
    });
    

    return (
        <View
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: "#d1d1d1", // '#e0e0e0',
                overflow: 'hidden',
                marginVertical: 6,
            }}
        >
            <Animated.View
                style={[
                    {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        opacity: 0.4,
                    },
                    animatedStyle,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({})