import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import { kolors } from '@/constants/Colors';
import { useUserStore } from '@/state/userStore';
import { defaultApiResponse } from '@/util/resources';
import AppInputField from '@/components/form/AppInputField';
import AppButton from '@/components/form/AppButton';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import PreparationTips from '@/components/PrepTips';


const formSchema = yup.object({
    sessionTitle: yup.string().required().min(2).trim().label("Session title"),
    difficulty: yup.string().required().trim().label("Difficulty level"),
    questionCount: yup.number().required().label("Question count"),
});



type Document = {
    name: string;
    size: string;
    uri: string;
    type: string;
};

const ExamPreparationScreen = () => {
    const [difficulty, setDifficulty] = useState('Intermediate');
    const [questionCount, setQuestionCount] = useState(30);
    const [documents, setDocuments] = useState<Document[]>([]);

    const userData = useUserStore((state) => state.userData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);

    const {
        control, handleSubmit, setValue, getValues, formState: { errors, isValid, isSubmitting }
    } = useForm({ 
        resolver: yupResolver(formSchema), 
        mode: 'onBlur',
        defaultValues: {
            sessionTitle: '',
            difficulty: 'Intermediate',
            questionCount: 30,
        }
    });
    
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                    'application/vnd.ms-powerpoint', 
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
                    'text/plain', 
                    'image/jpg', 'image/jpeg', 'image/png',
                ],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                const newDoc = {
                    name: result.assets[0].name,
                    size: `${((result.assets?.[0]?.size || 0) / 1024).toFixed(1)} KB`,
                    uri: result.assets[0].uri,
                    type: 'document'
                };
                setDocuments([...documents, newDoc]);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    // const pickImage = async () => {
    //     try {
    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: false,
    //             quality: 1,
    //         });

    //         if (!result.canceled && result.assets[0]) {
    //             const newDoc = {
    //                 name: result.assets[0].fileName || `image_${Date.now()}`,
    //                 size: `${(result.assets[0].fileSize ? result.assets[0].fileSize / 1024 : 0).toFixed(1)} KB`,
    //                 uri: result.assets[0].uri,
    //                 type: 'image'
    //             };
    //             setDocuments([...documents, newDoc]);
    //         }
    //     } catch (err) {
    //         console.error('Error picking image:', err);
    //     }
    // };

    const handleUpload = () => {
        // For mobile, we'll show an action sheet to choose between document and image
        // In a real app, you might want to use ActionSheet from '@expo/react-native-action-sheet'
        pickDocument();
    };

    const removeDocument = (index: number) => {
        const newDocs = [...documents];
        newDocs.splice(index, 1);
        setDocuments(newDocs);
    };
	
	const onSubmit = async (formData: typeof formSchema.__outputType) => {
		// Simulate form submission
		// console.log('Submitted Data:', formData);
		setApiResponse(defaultApiResponse);

		try {
			const response = (await apiClient.post(`/auth/signup`, {
				...formData, location
			})).data;
			console.log(response);

			// const access_token = response.result.access_token;
			// const refresh_token = response.result.refresh_token;
			// const user = response.result.user;

			setApiResponse({
				display: true,
				status: true,
				message: response.message
			});


		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
	};


    return (
		<AppSafeAreaView>
            <AppScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Exam Preparation</Text>
                        <Text style={styles.subHeaderText}>Upload your study materials to create personalized questions.</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Session Title</Text>

                        <AppInputField
                            control={control}
                            name='sessionTitle'
                            errorz={errors}
                            // defaultValue=''

                            selectionColor={kolors.theme.secondry}
                            placeholder="E.g., Math Finals Prep"
                            placeholderTextColor={'gray'}
                            // keyboardType="email-address"
                            returnKeyType="next"
                            inputMode="text"
                            enterKeyHint="next"
                            textInputBgColor='#fff'
                            inputStyles={styles.input}
                        />                        
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Difficulty Level</Text>
                        <View style={styles.difficultyContainer}>
                            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.difficultyButton,
                                        difficulty === level && styles.selectedDifficulty
                                    ]}
                                    onPress={() => {
                                        setDifficulty(level);
                                        setValue('difficulty', level);
                                    }}
                                >
                                    <Text style={[
                                        styles.difficultyText,
                                        difficulty === level && styles.selectedDifficultyText
                                    ]}>
                                        {level}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Number of Questions: {questionCount}</Text>
                        <View style={styles.sliderContainer}>
                            <TouchableOpacity onPress={() => {
                                setQuestionCount(Math.max(5, questionCount - 5));
                                setValue('questionCount', Math.max(5, questionCount - 5));
                            }}>
                                <MaterialIcons name="remove" size={24} color="#6200ee" />
                            </TouchableOpacity>
                            <View style={styles.sliderTrack}>
                                <LinearGradient
                                    colors={['#6200ee', '#03dac6']}
                                    style={[styles.sliderProgress, { width: `${(questionCount / 50) * 100}%` }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => {
                                setQuestionCount(Math.min(50, questionCount + 5));
                                setValue('questionCount', Math.min(50, questionCount + 5));
                            }}>
                                <MaterialIcons name="add" size={24} color="#6200ee" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, {marginBottom: 10}]}>Upload Documents ({documents.length}/5)</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                            <FontAwesome name="cloud-upload" size={24} color={kolors.theme.secondry} />
                            <Text style={styles.uploadText}>Click to upload</Text>
                            <Text style={styles.uploadSubText}>PDF, DOC, DOCX, PPT, PPTX, JPG, JPEG, PNG, TXT (max 30MB)</Text>
                        </TouchableOpacity>

                        <View style={styles.documentsContainer}>
                            {documents.map((doc, index) => (
                                <View key={index} style={styles.documentItem}>
                                    <MaterialIcons
                                        name={doc.type === 'image' ? 'image' : 'insert-drive-file'}
                                        size={24}
                                        color="#6200ee"
                                    />
                                    <View style={styles.documentInfo}>
                                        <Text style={styles.documentName} numberOfLines={1}>{doc.name}</Text>
                                        <Text style={styles.documentSize}>{doc.size}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => removeDocument(index)}>
                                        <MaterialIcons name="close" size={20} color="#ff3d71" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    
                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isSubmitting}
                        loadingIndicator={isSubmitting}
                        text='Generate Questions'
                        textColor='#fff'
                        // btnWidth={"100%"}
                        btnTextTransform='none'
                    />  

                    <PreparationTips prepType='Exam Prep' />                  
                </View>
            </AppScrollView>
        </AppSafeAreaView>
    );
};

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
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#718096',
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        // marginBottom: 15,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    difficultyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    difficultyButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    selectedDifficulty: {
        backgroundColor: kolors.theme.primary, // '#6200ee',
        borderColor: kolors.theme.primary, // '#6200ee',
    },
    difficultyText: {
        fontSize: 16,
        color: '#4a5568',
        fontWeight: '500',
    },
    selectedDifficultyText: {
        color: '#fff',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    sliderTrack: {
        flex: 1,
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    sliderProgress: {
        height: '100%',
        borderRadius: 3,
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: kolors.theme.secondry, // '#6200ee',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    uploadText: {
        fontSize: 18,
        fontWeight: '600',
        color: kolors.theme.primary, // '#6200ee',
        marginTop: 10,
    },
    uploadSubText: {
        fontSize: 14,
        color: '#718096',
        marginTop: 5,
        textAlign: 'center',
    },
    documentsContainer: {
        marginTop: 10,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    documentInfo: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    documentName: {
        fontSize: 14,
        color: '#2d3748',
    },
    documentSize: {
        fontSize: 12,
        color: '#718096',
        marginTop: 2,
    },
    generateButton: {
        backgroundColor: '#6200ee',
        borderRadius: 8,
        padding: 18,
        alignItems: 'center',
        marginTop: 20,
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ExamPreparationScreen;