import { useCallback } from "react";
import { router } from 'expo-router';
import { getLocalStorage } from "@/util/storage";
import apiClient, { apiErrorResponse } from "@/util/apiClient";
import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";


export function useAuthHook() {
    const _loginUser = useUserStore((state) => state._loginUser);
    const _logOutUser = useUserStore((state) => state._logOutUser);

    const _setAppLoading = useSettingStore((state) => state._setAppLoading);

    const reAuthUser = useCallback(async () => {
        _setAppLoading({ display: true });
    
        // const access_token = getLocalStorage("access_token")
        const refresh_token = await getLocalStorage("refreshToken");
        const user_data = await getLocalStorage("user");
        
        if (!refresh_token || !user_data ) {
            _setAppLoading({ display: false });
            _logOutUser();
            router.replace("/auth/login");
            
            return {
                status: false,
            };
        }
        
        try {
            const response = (await apiClient.post(`/auth/refresh`, 
                { refresh_token: refresh_token },
            )).data;
            // console.log(response);
    
            _loginUser(response.result.user, response.result.newToken, refresh_token);
            // _handleRefreshToken(response.result.newToken, refresh_token);
            // _updateUser(response.result.user);

            router.replace("/account");
    
            _setAppLoading({ display: false });
    
            return {
                status: true,
                data: {
                    user: response.result.user,
                    accessToken: response.result.newToken,
                    refreshToken: refresh_token
                }
            };
        } catch (error: any) {
            // console.log(error);
            apiErrorResponse(error, "Oooops, something went wrong", false);
    
            _setAppLoading({ display: false });
            _logOutUser();
            router.replace("/auth/login");
    
            return {
                status: false,
            };
        }
    }, []);


    return {
        reAuthUser
    }
}



