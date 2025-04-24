import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MultipleChoice from '@/components/examTypes/MultipleChoice';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import ApiResponse from '@/components/form/ApiResponse';
import WrittingExam from '@/components/examTypes/WrittingExam';
import { prepInterface } from '@/typeInterfaces/prepInterface';
import { usePrepStore } from '@/state/prepStore';
import { defaultApiResponse } from '@/util/resources';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import ExamLoadingSkeleton from '@/components/examTypes/ExamLoadingSkeleton';


export default function QuestionScreen() {
    const { prepId } = useLocalSearchParams();
    const _prepData = usePrepStore((state) => state.prepData);
    // const _setPrepData = usePrepStore((state) => state._setPrepData);
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const [prepData, setPrepData] = useState<prepInterface>();

    useEffect(() => {
        if (!prepId) {
            router.push("/account")
        } else {
            getPrepQuestions();
        }

        if (_prepData.prepType == "Exam") setPrepData(_prepData);
    }, []);

    const getPrepQuestions = async () => {
		try {
			const response = (await apiClient.get(`/prep/details/${prepId}`)).data;
            // console.log(response);

            const prep: prepInterface = response.result.prep;
            // _setPrepData(prep);
            setPrepData(prep);
            // setQuestions(prep.transcript);

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
        if (!prepData) return <></>;

        if (prepData.exam.studyType == "multiple_choice") {
            return <MultipleChoice studyType='multiple_choice' />;
        } else if (prepData.exam.studyType == "true_false") {
            return <MultipleChoice studyType='true_false' />;
        } else if (prepData.exam.studyType == "flash_cards") {
            return <></>
        } else if (prepData.exam.studyType == "theory_essay") {
            return <WrittingExam studyType='theory_essay' />
        } else if (prepData.exam.studyType == "fill_in_the_blank") {
            return <WrittingExam studyType='fill_in_the_blank' />
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
                        prepData ? 
                            renderQuestionScreen()
                        : <ExamLoadingSkeleton />
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