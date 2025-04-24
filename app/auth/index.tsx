import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
import AppButton from '@/components/form/AppButton';
import { router } from 'expo-router';
import Constants from 'expo-constants';

export default function index() {

    return (
        <AppSafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        style={{
                            width: 40,
                            height: 40
                        }}
                        source={require('@/assets/images/notification-icon.png')}
                    />

                    <AppText style={styles.headerText}>Savy Prep</AppText>
                </View>


                <View style={styles.contentContainer}>
                    <Image
                        style={{
                            // width: "auto",
                            width: "95%",
                            height: 300,
                            objectFit: "contain"
                        }}
                        source={require('@/assets/images/welcomeScreen.png')}
                    />

                    <AppText style={[styles.contentText, styles.contentTitle]}>
                        Preparation for {"\n"} Exams & Interviews
                    </AppText>

                    <AppText style={styles.contentText}>
                        We're here to help your exam & interview preparations to be more effective & efficient.
                        {"\n"}
                        Let's get you started on your journey to success.
                    </AppText>

                </View>

                {/* Footer */}
                <View style={styles.footerActionBtn}>
                    <AppButton
                        onPress={() => { router.replace("/auth/signup") }}
                        // disabled={!isValid || isSubmitting}
                        loadingIndicator={false}
                        text='Get Started'
                        textColor={kolors.theme.primary}

                        btnBgColor="#fff"
                        fullWidth={true}
                        btnTextTransform='none'
                    />

                    <AppButton
                        onPress={() => { router.replace("/auth/login") }}
                        // disabled={!isValid || isSubmitting}
                        loadingIndicator={false}
                        text='Sign In'
                        textColor='#fff'
                        btnBgColor={kolors.theme.secondry}
                        fullWidth={true}
                        btnTextTransform='none'
                    />
                </View>
            </View>
        </AppSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: kolors.theme.primary,
        paddingTop: Constants.statusBarHeight + 15,
        padding: 15,
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "space-between"
    },
    headerContainer: {
        // flexDirection: "row",
        // gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
    headerText: {
        color: "#fff",
        fontSize: 25
    },
    contentContainer: {
        marginTop: "auto",
        alignItems: "center"

    },
    contentTitle: {
        fontSize: 35,
        fontWeight: "bold"
    },
    contentText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },


    footerActionBtn: {
        // flexDirection: "column",
        marginTop: "auto",
        paddingVertical: 15,
        gap: 15,
        // backgroundColor: "red"
    }

})