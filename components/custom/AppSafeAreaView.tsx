import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { kolors } from '@/constants/Colors';
// import Constants from 'expo-constants';

const AppSafeAreaView = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

export default AppSafeAreaView;

const styles = StyleSheet.create({
    container: {
        // paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        // paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: "#fff", // "#c2c2c2", // kolors.theme.primary,
    }
})