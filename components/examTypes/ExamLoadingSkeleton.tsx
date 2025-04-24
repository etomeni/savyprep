import { StyleSheet, View } from 'react-native'
import React from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function ExamLoadingSkeleton() {
    return (
        <View>

            <View>
                <View style={styles.timerCount}>
                    <LoadingSkeleton width={"20%"} height={10} borderRadius={8} />
                    <LoadingSkeleton width={"20%"} height={10} borderRadius={8} />
                </View>

                {/* loading bar */}
                <LoadingSkeleton width={"100%"} height={10} borderRadius={8} />
            </View>

            {/* question */}
            <View style={{marginVertical: 20}}>
                <LoadingSkeleton width={"100%"} height={150} borderRadius={8} />
            </View>

            {/* options */}
            <View>
                <LoadingSkeleton width={"100%"} height={50} borderRadius={8} />
                <LoadingSkeleton width={"100%"} height={50} borderRadius={8} />
                <LoadingSkeleton width={"100%"} height={50} borderRadius={8} />
                <LoadingSkeleton width={"100%"} height={50} borderRadius={8} />
                <LoadingSkeleton width={"100%"} height={50} borderRadius={8} />
            </View>

            {/* action buttions */}
            <View style={styles.actionBtn}>
                <LoadingSkeleton width={"43%"} height={50} borderRadius={8} />
                <LoadingSkeleton width={"43%"} height={50} borderRadius={8} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timerCount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    actionBtn: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
    }
})