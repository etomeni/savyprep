import React, { useEffect, useRef, useState } from 'react';
import { 
    View, StyleSheet, TextInput, 
    TouchableOpacity, KeyboardAvoidingView, 
    Platform, FlatList, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
// import { usePrepStore } from '@/state/prepStore';
import Markdown from 'react-native-markdown-display';

import AppText from '@/components/custom/AppText';
import ApiResponse from '@/components/form/ApiResponse';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import { kolors } from '@/constants/Colors';
import { usePrepHook } from '@/hooks/usePrepHook';
import { prepDiscussInterface } from '@/constants/types';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { defaultApiResponse, formatChatDate } from '@/util/resources';


const dateNow = new Date().toISOString();

const AIAssistantScreen = () => {
    const { prepId, prepFeedbackId } = useLocalSearchParams();

    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    // const prepData = usePrepStore((state) => state.prepData);
    const [message, setMessage] = useState('');
    const [temptUserMessage, setTemptUserMessage] = useState<prepDiscussInterface>();
    const [messages, setMessages] = useState<prepDiscussInterface[]>([]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const {
        getPrepDiscussions, getPrepDetailsById, prepDetails,
        totalPages, currentPageNo
    } = usePrepHook();

    const initialMessage: prepDiscussInterface = {
        _id: "1",
        userId: '',
        userEmail: '',
        prepFeedbackId: prepFeedbackId.toString() || '',
        prepId: prepId.toString() || '',
        text: `Hello! I'm your AI prep assistant. How can I help you with your ${prepDetails ? prepDetails.prepType.toLocaleLowerCase() : "exam or interview"} preparation today?`,
        role: 'assistant',
        createdAt: `${dateNow}`,
        updatedAt: '',
    };

    useEffect(() => {
        if (!prepId.toString() || !prepFeedbackId.toString()) {
            router.back();
            // router.push("/account");
        } else {
            getDiscussions(currentPageNo);
            getPrepDetailsById(prepId.toString());
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const handleSend = async () => {
        setApiResponse(defaultApiResponse);
        const msg = message.trim();
        if (!msg) return;

        const userMessage: prepDiscussInterface = {
            _id: `${messages.length + 1}-temptId`,
            userId: '',
            userEmail: '',
            prepFeedbackId: prepFeedbackId.toString() || '',
            prepId: prepId.toString() || '',
            text: msg,
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: '',
        };
        setTemptUserMessage(userMessage);
        setIsWaitingForResponse(true);
        setMessage('');

        try {
            const response = (await apiClient.post(`/prep/chat`,
                {
                    prepId: prepId,
                    prepFeedbackId: prepFeedbackId,
                    userPrompt: userMessage.text,
                }
            )).data;
            // console.log(response);
            const userDiscussion: prepDiscussInterface = response.result.userDiscussion;
            const aiDiscussReponse: prepDiscussInterface = response.result.aiDiscussReponse;

            setMessages(prev => [...prev, userDiscussion, aiDiscussReponse]);
            setTemptUserMessage(undefined);

            setIsWaitingForResponse(false);

        } catch (error) {
            // console.log(error);
            setIsWaitingForResponse(false);

            const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
            setApiResponse({
                display: true,
                status: false,
                message: message
            });
        }
    };

    const getDiscussions = async (currentPageNo: number) => {
        setApiResponse(defaultApiResponse);
        const prepDiscussions = await getPrepDiscussions(
            prepId.toString(),
            prepFeedbackId.toString(),
            currentPageNo,
        );
        setMessages(prev => [...prepDiscussions.reverse(), ...prev]);
    }

    const handleLoadMore = async () => {
        if (currentPageNo < totalPages) {
            // console.log("load more");
            getDiscussions(currentPageNo + 1);
            // setCurrentPageNo(currentPageNo + 1);
        }
    };


    return (
        <AppSafeAreaView>
            <Stack.Screen options={{ title: `AI Assistant` }} />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
            >
                {/* Chat Messages */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={({ item }: { item: prepDiscussInterface }) => (
                        <View key={item._id}
                            style={[
                                styles.messageBubble,
                                item.role == "user" ? styles.userBubble : styles.aiBubble,
                                // isWaitingForResponse && styles.loadingBubble
                            ]}
                        >
                            {/* <AppText style={[
                                styles.messageText,
                                item.role == "user" ? styles.userText : styles.aiText,
                            ]}>
                                <Markdown
                                    style={{
                                        body: {
                                            fontSize: 16,
                                            lineHeight: 22,
                                            color: item.role == "user" ? "#ffffff" : "#2d3748",
                                        }
                                    }}
                                >{item.text}</Markdown>
                            </AppText> */}

                            <View style={{ maxWidth: '90%', flexShrink: 1 }}>
                                <Markdown style={{
                                    body: {
                                        // color: '#333',
                                        fontSize: 15,
                                        flexShrink: 1,
                                        flexWrap: 'wrap',

                                        // fontSize: 16,
                                        lineHeight: 22,
                                        color: item.role == "user" ? "#ffffff" : "#2d3748",
                                    },
                                    code_inline: {
                                        backgroundColor: '#e0e0e0',
                                        paddingHorizontal: 4,
                                        borderRadius: 4,
                                        fontFamily: 'monospace',
                                        flexWrap: 'wrap',
                                        flexShrink: 1,
                                        maxWidth: '100%',
                                    },
                                    paragraph: {
                                        flexWrap: 'wrap',
                                        flexShrink: 1,
                                    },
                                }}>{item.text}</Markdown>
                            </View>

                            <AppText style={styles.timeText}
                            >{formatChatDate(item.createdAt)}</AppText>
                        </View>
                    )}

                    ItemSeparatorComponent={() => <View style={{ height: 5 }} />}

                    ListHeaderComponent={() =>
                        <>
                            <View style={styles.header}>
                                <AppText style={styles.headerText}>{prepDetails?.prepTitle || ''}</AppText>

                                <AppText style={styles.subHeaderText}
                                >Get help with your {prepDetails?.prepType || ''} preparation</AppText>
                            </View>

                            <View
                                style={[
                                    styles.messageBubble,
                                    styles.aiBubble,
                                ]}
                            >
                                <AppText style={[
                                    styles.messageText,
                                    styles.aiText
                                ]}>
                                    {initialMessage.text}
                                </AppText>

                                <AppText style={styles.timeText}
                                >{formatChatDate(initialMessage.createdAt)}</AppText>
                            </View>
                        </>
                    }

                    ListFooterComponent={() =>
                        <>
                            {temptUserMessage ?
                                <View
                                    style={[
                                        styles.messageBubble,
                                        styles.userBubble,
                                    ]}
                                >
                                    <AppText style={[
                                        styles.messageText,
                                        styles.userText
                                    ]}>{temptUserMessage.text}</AppText>

                                    <AppText style={styles.timeText}
                                    >{formatChatDate(temptUserMessage.createdAt)}</AppText>
                                </View>
                                : <></>}

                            {apiResponse.display && !apiResponse.status ?
                                <ApiResponse
                                    display={apiResponse.display}
                                    status={apiResponse.status}
                                    message={apiResponse.message}
                                />
                                : <></>
                            }

                            {isWaitingForResponse ?
                                <View
                                    style={[
                                        styles.messageBubble,
                                        styles.aiBubble,
                                        styles.loadingBubble
                                    ]}
                                >
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="small" color={kolors.theme.secondry} />
                                        <AppText style={styles.loadingText}>AI is thinking...</AppText>
                                    </View>
                                </View>
                                : <></>}
                        </>
                    }

                    // keyExtractor={(item, i) => item._id || i.toString()}
                    onEndReachedThreshold={0.1}

                    onStartReached={handleLoadMore}
                    onStartReachedThreshold={0.1}

                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 5 }}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask anything about your preparation..."
                        placeholderTextColor="#999"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        editable={!isWaitingForResponse}
                    />

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        disabled={!message.trim() || isWaitingForResponse}
                    >
                        <Ionicons
                            name="send"
                            size={24}
                            color={message.trim() && !isWaitingForResponse ? kolors.theme.secondry : "#ccc"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Footer Note */}
                {/* <AppText style={styles.footerNote}>
                    Your chat data helps us improve your preparation
                </AppText> */}
            </KeyboardAvoidingView>

        </AppSafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eef8fc", // '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        // paddingTop: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        marginBottom: 15,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#718096',
        // marginTop: 5,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    chatContent: {
        paddingVertical: 20,
    },
    messageBubble: {
        maxWidth: '85%',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: kolors.theme.secondry, // '#6200ee',
        borderBottomRightRadius: 4,
    },
    loadingBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 4,
        minWidth: 120,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingText: {
        marginLeft: 8,
        color: '#718096',
        fontSize: 14,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    aiText: {
        color: '#2d3748',
    },
    userText: {
        color: '#ffffff',
    },
    timeText: {
        fontSize: 12,
        color: '#718096',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: 120,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
        padding: 10,
    },
    footerNote: {
        textAlign: 'center',
        fontSize: 12,
        color: '#718096',
        paddingBottom: 20,
        paddingTop: 8,
        backgroundColor: '#ffffff',
    },
});

export default AIAssistantScreen;