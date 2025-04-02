import React from 'react';
import { Modal, StyleSheet, View, Image } from 'react-native';
import { kolors } from '@/constants/Colors';

import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';

// import LottieView from 'lottie-react-native';
import { useSettingStore } from '@/state/settingStore';

export interface LoadingModalProps {
    display: boolean,
    success?: boolean,
    overlayBgColor?: string,
};

const LoadingModal:React.FC<LoadingModalProps> = ({
    display = false, success = false, overlayBgColor = kolors.theme.overlayBgColor
}) => {
    // const [modalVisible, setModalVisible] = useState(display);
    const appSettings = useSettingStore((state) => state.settings);
    const _setAppLoading = useSettingStore((state) => state._setAppLoading);

    // const lottieSuccessAnimation = useRef<LottieView>(null);

    if (appSettings.appLoading.success) {
        setTimeout(() => {
            _setAppLoading({display: false, success: false})
        }, 3000);
    }


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
        <Modal
            animationType="slide"
            transparent={true}
            visible={display}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: overlayBgColor,
            }}>
                {appSettings.appLoading.success ? (
                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.image}

                            source={require('@/assets/images/successful.gif')}
                        />

                        {/* <LottieView
                            autoPlay
                            ref={lottieSuccessAnimation}
                            style={{
                                width: 200,
                                height: 200,
                                // backgroundColor: '#eee',
                            }}
                            source={require('@/assets/successful.json')}
                            onAnimationFinish={() => setModalVisible(false)}
                        /> */}
                    </View>
                ) : (
                    <View style={styles.imgContainer}>
                        <Animated.Image
                            style={[styles.image, animatedStyle]}

                            source={require('@/assets/images/savyPrep.png')}
                        />
                    </View>
                )}
            </View>
        </Modal>
    )
}

export default LoadingModal;

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