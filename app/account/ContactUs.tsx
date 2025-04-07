import React, { useState } from 'react';
import { 
    View, StyleSheet,
    ScrollView, // Linking, Image 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
import AppInputField from '@/components/form/AppInputField';
import AppButton from '@/components/form/AppButton';
import { defaultApiResponse } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import ApiResponse from '@/components/form/ApiResponse';


const formSchema = yup.object({
    fullName: yup.string().required().min(2).trim().label("Full Name"),
    message: yup.string().required().min(10, "Message must be at least 10 characters").trim().label("Message"),

    email: yup.string().required()
        .email("Please enter a valid email address.")
        .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
            , "Please enter a valid email address.")
        .trim().label("Email address"),
});


const ContactUsScreen = () => {
    const userData = useUserStore((state) => state.userData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    
    const {
        control, handleSubmit, formState: { errors, isValid, isSubmitting }
    } = useForm({ 
        resolver: yupResolver(formSchema), 
        mode: 'onBlur',
        defaultValues: {
            fullName: userData.fullName,
            email: userData.email,
            message: '',
        }
    });


	const onSubmit = async (formData: typeof formSchema.__outputType) => {
        try {
            const response = (await apiClient.post(`/gen/chat-us`, formData)).data;
            // console.log(response);

            setApiResponse({
                display: true,
                status: true,
                message: response.message,
            });
        } catch (error: any) {
            const errorMessage = apiErrorResponse(error, "Oooops, something went wrong", false);
            setApiResponse({
                display: true,
                status: true,
                message: errorMessage,
            });
        }
    };

    // const openSocialLink = (url: string) => {
    //     Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    // };

    return (
		<AppSafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar style="dark" />

                {/* Header with decorative element */}
                <View style={styles.header}>
                    <Animatable.Text
                        animation="fadeInDown"
                        duration={1000}
                        style={styles.headerText}
                    >
                        Chat Us
                    </Animatable.Text>
                    <View style={styles.headerDecoration} />
                </View>

                {/* Contact information cards */}
                {/* <View style={styles.infoContainer}>
                    <Animatable.View
                        animation="fadeInLeft"
                        duration={800}
                        delay={200}
                        style={styles.infoCard}
                    >
                        <MaterialIcons name="email" size={24} color={kolors.theme.secondry} />
                        <AppText style={styles.infoTitle}>Email Us</AppText>
                        <AppText style={styles.infoText}>support@yourcompany.com</AppText>
                    </Animatable.View>

                    <Animatable.View
                        animation="fadeInRight"
                        duration={800}
                        delay={400}
                        style={styles.infoCard}
                    >
                        <Feather name="phone" size={24} color={kolors.theme.secondry} />
                        <AppText style={styles.infoTitle}>Call Us</AppText>
                        <AppText style={styles.infoText}>+1 (555) 123-4567</AppText>
                    </Animatable.View>
                </View> */}

                {/* Contact form */}
                <Animatable.View
                    animation="fadeInUp"
                    duration={800}
                    delay={600}
                    style={[styles.formContainer, { marginTop: 15 }]}
                >
                    <AppText style={styles.formTitle}>Send us a message</AppText>

                    <View style={styles.inputContainer}>
                        <AppText style={styles.label}>Your Name</AppText>

                        <AppInputField
                            control={control}
                            name='fullName'
                            errorz={errors}
                            defaultValue={userData.fullName}

                            selectionColor={kolors.theme.secondry}
                            placeholder="Enter your full name"
                            placeholderTextColor={'gray'}
                            // keyboardType="email-address"
                            returnKeyType="next"
                            inputMode="text"
                            enterKeyHint="next"
                            textInputBgColor='#fff'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <AppText style={styles.label}>Email Address</AppText>

                        <AppInputField
                            control={control}
                            name='email'
                            errorz={errors}
                            defaultValue={userData.email}

                            selectionColor={kolors.theme.secondry}
                            placeholder="Enter your email address"
                            placeholderTextColor={'gray'}
                            keyboardType="email-address"
                            returnKeyType="next"
                            inputMode="email"
                            enterKeyHint="next"
                            textInputBgColor='#fff'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <AppText style={styles.label}>Your Message</AppText>

                        <AppInputField
                            control={control}
                            name='message'
                            errorz={errors}
                            defaultValue=''
                            multiline
                            numberOfLines={4}

                            selectionColor={kolors.theme.secondry}
                            placeholder="How can we help you?"
                            placeholderTextColor={'gray'}
                            // keyboardType="email-address"
                            returnKeyType="next"
                            inputMode="text"
                            enterKeyHint="next"
                            textInputBgColor='#fff'
                        />
                    </View>


					<ApiResponse
						display={apiResponse.display}
						status={apiResponse.status}
						message={apiResponse.message}
					/>

                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isSubmitting}
                        loadingIndicator={isSubmitting}
                        text='Send Message'
                        textColor='#fff'
                        btnWidth={"100%"}
                        btnTextTransform='none'
                    />
                    
                </Animatable.View>

                {/* Social media links */}
                <Animatable.View
                    animation="fadeIn"
                    duration={1000}
                    delay={800}
                    style={styles.socialContainer}
                >
                    <AppText style={styles.socialTitle}>Connect With Us</AppText>

                    {/* <View style={styles.socialIcons}>
                        <TouchableOpacity onPress={() => openSocialLink('https://facebook.com')}>
                            <FontAwesome name="facebook" size={28} color="#4267B2" style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openSocialLink('https://twitter.com')}>
                            <FontAwesome name="twitter" size={28} color="#1DA1F2" style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openSocialLink('https://instagram.com')}>
                            <FontAwesome name="instagram" size={28} color="#E1306C" style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openSocialLink('https://linkedin.com')}>
                            <FontAwesome name="linkedin" size={28} color="#0077B5" style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View> */}
                </Animatable.View>
            </ScrollView>
        </AppSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        paddingBottom: 40,
    },
    header: {
        padding: 24,
        paddingBottom: 40,
        backgroundColor: kolors.theme.secondry, // '#6200ee',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        position: 'relative',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    headerDecoration: {
        position: 'absolute',
        bottom: -20,
        left: '50%',
        width: 40,
        height: 40,
        backgroundColor: kolors.theme.secondry, // '#6200ee',
        transform: [{ rotate: '45deg' }, { translateX: -20 }],
        zIndex: -1,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '48%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
        marginVertical: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#4a5568',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    textArea: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        height: 120,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#ff3d71',
    },
    errorText: {
        color: '#ff3d71',
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: kolors.theme.secondry, // '#6200ee',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    socialContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    socialTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 16,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialIcon: {
        marginHorizontal: 12,
    },
});

export default ContactUsScreen;