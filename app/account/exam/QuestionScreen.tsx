import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MultipleChoice from '@/components/examTypes/MultipleChoice'
import AppSafeAreaView from '@/components/custom/AppSafeAreaView'
import AppScrollView from '@/components/custom/AppScrollView'

export default function QuestionScreen() {
    return (
        <AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
                <View style={styles.container}>
                    <MultipleChoice />
                </View>
            </AppScrollView>
        </AppSafeAreaView>
    )
}

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
})