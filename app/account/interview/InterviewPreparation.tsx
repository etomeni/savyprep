import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppTextInput from '@/components/form/Input';
import { kolors } from '@/constants/Colors';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { defaultApiResponse } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import AppInputField from '@/components/form/AppInputField';
import AppButton from '@/components/form/AppButton';
import AppText from '@/components/custom/AppText';
import PreparationTips from '@/components/PrepTips';


const formSchema = yup.object({
    sessionTitle: yup.string().required().min(2).trim().label("Session Title"),
    targetRole: yup.string().required().trim().label("Role"),
    interviewType: yup.string().required().trim().label("Interview Type"),
    experienceLevel: yup.string().required().trim().label("Experience Level"),
    skills: yup.string().required().trim().label("Skills"),
    jobDescription: yup.string().optional().trim().label("Job Description"),
    questionCount: yup.number().required().label("Question Count"),
});

const InterviewPreparationScreen = () => {
    const [interviewType, setInterviewType] = useState('Technical');
    const [experienceLevel, setExperienceLevel] = useState('Entry Level');
    const [skillsInput, setSkillsInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [questionCount, setQuestionCount] = useState(10);

	const userData = useUserStore((state) => state.userData);
	const [apiResponse, setApiResponse] = useState(defaultApiResponse);

	const {
		control, handleSubmit, setValue, formState: { errors, isValid, isSubmitting }
	} = useForm({ 
        resolver: yupResolver(formSchema), 
        mode: 'onBlur',
        defaultValues: {
            sessionTitle: '',
            targetRole: '',
            interviewType: 'Technical',
            experienceLevel: 'Entry Level',
            skills: '',
            jobDescription: '',
            questionCount: 10
        }
    });

	
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

    // Function to handle the string input and update the state
    const addSkills = (inputString: string) => {
        // Split the string by commas, trim extra spaces, and filter out empty items
        const newArray = inputString
            .split(',').map(item => item.trim())
            .filter(item => item !== ''); // Remove empty strings
    
        // Update the state by appending the new array to the existing one
        setSkills([...skills, ...newArray]);
        setSkillsInput('');

        // Update the form value
        setValue('skills', [...skills, ...newArray].join(', '));
    };

    const removeSkill = (index: number) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);

        // Update the form value
        setValue('skills', newSkills.join(', '));
    };

    
    return (
        <AppSafeAreaView>
            <AppScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Interview Preparation</Text>
                        <Text style={styles.subHeaderText}>Simulate interview questions for your target role.</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Session Title</Text>

                        <AppInputField
                            control={control}
                            name='sessionTitle'
                            errorz={errors}
                            defaultValue=''

                            selectionColor={kolors.theme.secondry}
                            placeholder="E.g., Frontend Developer Interview Prep"
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
                        <Text style={styles.sectionTitle}>Role You're Applying For</Text>

                        <AppInputField
                            control={control}
                            name='targetRole'
                            errorz={errors}
                            defaultValue=''

                            selectionColor={kolors.theme.secondry}
                            placeholder="E.g., Frontend Developer"
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
                        <Text style={styles.sectionTitle}>Interview Type</Text>
                        <View style={styles.optionsContainer}>
                            {['Technical', 'Behavioral', 'Mixed'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.optionButton,
                                        interviewType === type && styles.selectedOption
                                    ]}
                                    onPress={() => {
                                        setInterviewType(type);
                                        setValue('interviewType', type);
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        interviewType === type && styles.selectedOptionText
                                    ]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience Level</Text>
                        <View style={styles.optionsContainer}>
                            {['Entry Level', 'Junior Level', 'Mid Level', 'Senior Level'].map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.optionButton,
                                        experienceLevel === level && styles.selectedOption
                                    ]}
                                    onPress={() => {
                                        setExperienceLevel(level);
                                        setValue('experienceLevel', level);
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        experienceLevel === level && styles.selectedOptionText
                                    ]}>
                                        {level}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, {marginBottom: 0}]}>Technologies & Skills</Text>
                        <Text style={[styles.hintText, {marginTop: 0, marginBottom: 8}]}>Add relevant skills for your role</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // marginTop: 10,
                            gap: 10,
                            // width: '100%',
                        }}>
                            <AppTextInput 
                                value={skillsInput}
                                onChangeText={setSkillsInput}
                                // onBlur={onBlur}
                                // onChangeText={onChange}
                                // errors={errorz[name] ? true : false}
                                
                                // name="sessionTitle"

                                selectionColor={kolors.theme.secondry}
                                placeholder="E.g., React, JavaScript, CSS"
                                placeholderTextColor={'gray'}
                                // keyboardType="email-address"
                                returnKeyType="next"
                                inputMode="text"
                                enterKeyHint="next"
                                textInputBgColor='#fff'
                                inputStyles={styles.input}
                            />

                            <TouchableOpacity
                                style={{
                                    backgroundColor: kolors.theme.primary,
                                    borderRadius: 8,
                                    padding: 15,
                                    alignItems: 'center',
                                    // marginTop: 20,
                                }}
                                onPress={() => addSkills(skillsInput)}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 15,
                                    // fontWeight: '600',
                                }}>Add</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.skillsRow}>
                            {skills.map((skill, index) => (
                                <View key={index} style={styles.skills}>
                                    <AppText style={styles.skillsText}>{skill}</AppText>

                                    <TouchableOpacity onPress={() => removeSkill(index)}>
                                        <MaterialIcons name="close" size={16} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, {marginBottom: 0}]}>Job Description (Optional)</Text>
                        <Text style={[styles.hintText, {marginTop: 0, marginBottom: 8}]}>Helps generate more specific questions</Text>

                        <AppInputField
                            control={control}
                            name='jobDescription'
                            errorz={errors}
                            defaultValue=''
                            multiline
                            numberOfLines={4}

                            selectionColor={kolors.theme.secondry}
                            placeholder="Paste the job description here for more tailored questions..."
                            placeholderTextColor={'gray'}
                            // keyboardType="email-address"
                            returnKeyType="next"
                            inputMode="text"
                            enterKeyHint="next"
                            textInputBgColor='#fff'
                            inputStyles={[styles.input, styles.multilineInput]}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Number of Questions: {questionCount}</Text>
                        <View style={styles.sliderContainer}>
                            <TouchableOpacity
                                // style={styles.sliderButton}
                                onPress={() => {
                                    setQuestionCount(Math.max(5, questionCount - 1));
                                    setValue('questionCount', Math.max(5, questionCount - 1));
                                }}
                            >
                                <MaterialIcons name="remove" size={20} color="#6200ee" />
                            </TouchableOpacity>

                            <View style={styles.sliderTrack}>
                                <LinearGradient
                                    colors={['#6200ee', '#03dac6']}
                                    style={[styles.sliderProgress, { width: `${((questionCount - 5) / 25) * 100}%` }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                />
                            </View>

                            <TouchableOpacity
                                // style={styles.sliderButton}
                                onPress={() => {
                                    setQuestionCount(Math.min(30, questionCount + 1));
                                    setValue('questionCount', Math.min(30, questionCount + 1));
                                }}
                            >
                                <MaterialIcons name="add" size={20} color="#6200ee" />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isSubmitting}
                        loadingIndicator={isSubmitting}
                        text='Generate Interview Questions'
                        textColor='#fff'
                        // btnWidth={"100%"}
                        btnTextTransform='none'
                    />

                    <PreparationTips prepType='Interview Prep' />                  
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
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        // marginBottom: 12,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    hintText: {
        fontSize: 14,
        color: '#718096',
        marginTop: 8,
        fontStyle: 'italic',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    optionButton: {
        minWidth: '30%',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    selectedOption: {
        backgroundColor: kolors.theme.primary, // '#6200ee',
        borderColor: kolors.theme.primary, // '#6200ee',
    },
    optionText: {
        fontSize: 14,
        color: '#4a5568',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: '#fff',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
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
    sliderMinMax: {
        fontSize: 14,
        color: '#718096',
    },
    sliderButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    sliderButton: {
        padding: 10,
        marginHorizontal: 15,
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

    skillsRow: {
        flexDirection: 'row',
        // marginBottom: 16,
        flexWrap: "wrap",
        gap: 5,
        // paddingHorizontal: 15,
    },
    skills: {
        backgroundColor: '#F0F0F0',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        // marginRight: 8,
        
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    skillsText: {
        fontSize: 14,
        color: '#333',
    },
});

export default InterviewPreparationScreen;