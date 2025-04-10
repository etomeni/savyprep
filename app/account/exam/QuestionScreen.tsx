import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MultipleChoice from '@/components/examTypes/MultipleChoice';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import { prepInterface } from '@/typeInterfaces/prepInterface';
import { usePrepStore } from '@/state/prepStore';
import { defaultApiResponse } from '@/util/resources';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import LoadingView from '@/components/custom/LoadingView';
import ApiResponse from '@/components/form/ApiResponse';


export default function QuestionScreen() {
    const { prepId } = useLocalSearchParams();
    const prepData = usePrepStore((state) => state.prepData);
    const _setPrepData = usePrepStore((state) => state._setPrepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        } else if (!prepData._id) {
            getPrepQuestions();
        }
    }, [prepData]);

    const getPrepQuestions = async () => {
		try {
			const response = (await apiClient.get(`/prep/${prepId}`)).data;
            // console.log(response);

            const prep: prepInterface = response.result.prep;
            _setPrepData(prep);
            // setQuestions(prep.transcript);

            // setQuestions(
            //     prep.transcript.map((question) => ({ ...question, userAnswer: '' }))
            // );

		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }

    const renderQuestionScreen = () => {
        if (prepData.exam.studyType == "multipleChoices") {
            return <MultipleChoice />;
        } else if (prepData.exam.studyType == "flash card") {
            return <></>
        } else if (prepData.exam.studyType == "subjective") {
            return <></>
        } else if (prepData.exam.studyType == "booleanObjective") {
            return <></>
        } else if (prepData.exam.studyType == "theory") {
            return <></>
        } else {
            return (
                <View>
                    <ApiResponse
                        display={apiResponse.display}
                        status={apiResponse.status}
                        message={apiResponse.message}
                    />
                </View> 
            );
        }
    }
    

    return (
        <AppSafeAreaView>
            <AppScrollView contentStyle={{ backgroundColor: '#f8f9fa' }}>
                <View style={styles.container}>
                    {
                        prepData._id ? 
                            renderQuestionScreen()
                        : <LoadingView />
                    }
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
		paddingBottom: 85,

		marginHorizontal: "auto",
		marginVertical: "auto",
	},
})