import { useCallback, useState } from "react";
import { router } from 'expo-router';
import { getLocalStorage } from "@/util/storage";
import apiClient, { apiErrorResponse } from "@/util/apiClient";
import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";
import { prepFeedbackInterface, prepInterface } from "@/typeInterfaces/prepInterface";
import { defaultApiResponse } from "@/util/resources";
import { usePrepStore } from "@/state/prepStore";


export function usePrepHook() {
    // const _loginUser = useUserStore((state) => state._loginUser);
    const _setAppLoading = useSettingStore((state) => state._setAppLoading);

    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [allPrep, setAllPrep] = useState<prepInterface[]>();
    const _setAllPreps = usePrepStore((state) => state._setAllPreps);

    const _setPrepData = usePrepStore((state) => state._setPrepData);
    const [prepDetails, setPrepDetails] = useState<prepInterface>();
    
    const [prepFeedbackDetails, setPrepFeedbackDetails] = useState<prepFeedbackInterface>();
    const _setPrepFeedback = usePrepStore((state) => state._setPrepFeedback);


    const getAllPreps = useCallback(async (
        page: number = currentPageNo, limit: number = limitNo,
        prepType: 'All' | 'Exam' | 'Interview' = "All",
    ) => {
		try {
			const response = (await apiClient.get(`/prep`,
                {
                    params: {
                        page: page,
                        limit: limit,
                        prepType: prepType,
                    }
                }

            )).data;
            // console.log(response);

            const prep: prepInterface[] = response.result.prep;
            setAllPrep(prep);
            _setAllPreps(prep);

            setCurrentPageNo(response.result.currentPage);
            setTotalPages(response.result.totalPages);
            setTotalRecords(response.result.totalRecords);
    
		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }, []);

    const getPrepDetailsById = useCallback(async (prepId: string) => {
		try {
			const response = (await apiClient.get(`/prep/${prepId}`)).data;
            // console.log(response);

            const prep: prepInterface = response.result.prep;
            setPrepDetails(prep);
            _setPrepData(prep);
    
		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }, []);

    const getPrepFeedbackDetailsById = useCallback(async (prepId: string) => {
		try {
			const response = (await apiClient.get(`/prep/feedback/${prepId}`)).data;
            // console.log(response);

            const feedback: prepFeedbackInterface = response.result.feedback;
            setPrepFeedbackDetails(feedback);
            _setPrepFeedback(feedback);

		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }, []);

    const deletePrepDataById = useCallback(async (prepId: string) => {
		try {
			const response = (await apiClient.delete(`/prep/${prepId}`)).data;
            // console.log(response);
            getAllPreps();
		} catch (error: any) {
			// console.log(error);
			const message = apiErrorResponse(error, "Ooops, something went wrong. Please try again.", false);
			setApiResponse({
				display: true,
				status: false,
				message: message
			});
		}
    }, []);




    return {
        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        apiResponse, setApiResponse,

        allPrep, getAllPreps,
        prepDetails, getPrepDetailsById,
        prepFeedbackDetails, getPrepFeedbackDetailsById,
        deletePrepDataById
    }
}



