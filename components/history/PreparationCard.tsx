import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';



type _Props = {
    title?: string,
    createdAt_time?: string,
    createdAt_date?: string,
    tags?: string[],
    status?: string
};


const PreparationCard = ({
    title = "Javascript", createdAt_time = "14:19",
    createdAt_date = "03/04/2025", 
    tags = ['intermediate', '1 documents', "10 questions"],
    status = "In Progress"
}: _Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Feather name="book-open" size={24} color="#ADD8E6" />
                    <AppText style={styles.title}>{ title }</AppText>
                </View>

                <TouchableOpacity>
                    <Feather name="trash-2" size={16} color="#808080" />
                </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Feather name="calendar" size={14} color="#808080" />
                    <AppText style={styles.infoText}>{ createdAt_date }</AppText>
                </View>

                <View style={styles.infoItem}>
                    <Feather name="clock" size={14} color="#808080" />
                    <AppText style={styles.infoText}>{ createdAt_time }</AppText>
                </View>
            </View>

            <View style={styles.tagRow}>
                {tags.map((tagName, index) => (
                    <View key={index} style={styles.tag}>
                        <AppText style={styles.tagText}>{tagName}</AppText>
                    </View>
                ))}

                {/* <View style={styles.tag}>
                    <AppText style={styles.tagText}>1 documents</AppText>
                </View>

                <View style={styles.tag}>
                    <AppText style={styles.tagText}>10 questions</AppText>
                </View> */}
            </View>

            <View style={styles.statusRow}>
                <View>
                    <AppText style={styles.inProgressText}>In Progress</AppText>
                    <AppText style={styles.notCompletedText}>Not completed</AppText>
                </View>

                <TouchableOpacity style={styles.continueButton}>
                    <AppText style={styles.continueText}>Continue</AppText>
                    <Feather name="chevron-right" size={20} color="#ADD8E6" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        // padding: 16,
        // margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    infoText: {
        color: '#808080',
        marginLeft: 4,
        fontSize: 14,
    },
    tagRow: {
        flexDirection: 'row',
        // marginBottom: 16,
        flexWrap: "wrap",
        gap: 5,
        paddingHorizontal: 15,
    },
    tag: {
        backgroundColor: '#F0F0F0',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    tagText: {
        fontSize: 14,
        color: '#333',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "#eee",
        padding: 15,
    },
    inProgressText: {
        color: '#FFA500', // Or a similar color indicating progress
        fontWeight: 'bold',
        marginBottom: 2,
    },
    notCompletedText: {
        color: '#808080',
        fontSize: 14,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    continueText: {
        color: kolors.theme.secondry, // '#ADD8E6',
        fontWeight: 'bold',
        marginRight: 4,
    },
});

export default PreparationCard;