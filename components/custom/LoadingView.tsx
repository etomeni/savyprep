import React from 'react';
import { StyleSheet, View } from 'react-native';
import { kolors } from '@/constants/Colors';

import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';

export interface LoadingModalProps {
    // display: boolean,
    // success?: boolean,
    overlayBgColor?: string,
};

const LoadingView:React.FC<LoadingModalProps> = ({
    overlayBgColor = kolors.theme.overlayBgColor
}) => {

    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    // Configure the flip animation
    rotation.value = withRepeat(
        withSpring(Math.PI, { damping: 10, stiffness: 80, mass: 1, duration: 2000 }),
        -1, // Infinite loop
        true // Reverse direction on each iteration
    );

    // Configure the breathing animation
    scale.value = withRepeat(
        withSpring(0.85, { damping: 5, stiffness: 100, mass: 0.5 }),
        -1, // Infinite loop
        true // Reverse direction on each iteration
    );
  
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotateX: `${rotation.value}rad` }, 
                { scale: scale.value }
            ],
            
        };
    });
  

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: overlayBgColor,
        }}>
            <View style={styles.imgContainer}>
                <Animated.Image
                    style={[styles.image, animatedStyle]}

                    source={require('@/assets/images/savyPrep.png')}
                />
            </View>
        </View>
    )
}

export default LoadingView;

const styles = StyleSheet.create({
    imgContainer: {
        borderRadius: 16,
        overflow: "hidden",
        // backgroundColor: kolors.theme.light,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 150
    }
})