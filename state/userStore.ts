import { create } from "zustand";
import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { userInterface } from "@/typeInterfaces/userInterface";


const defaultUserData: userInterface = {
	_id: "",
	fullName: "",
	email: "",
	country: "",
	plan: "free",
	password: "",
	status: false,
	role: "",
	createdAt: "",
	updatedAt: "",
};


type _typeInterface_ = {
	accessToken: string;
	refreshToken: string;
	userData: userInterface;
	isLoggedIn: boolean;
	// _signupContactInfo: (user: _signupContactInfoType) => void;

	_setUserDetails: (user: userInterface) => void;

	_loginUser: (user: userInterface, accessToken: string, refreshToken: string) => void;

	_handleRefreshToken: (accessToken: string, refreshToken: string) => void;

	_logOutUser: () => void;
	_handleRestoreUser: () => void;
};

export const useUserStore = create<_typeInterface_>((set) => ({
	accessToken: "",
	refreshToken: "",
	userData: defaultUserData,
	isLoggedIn: false,

	_setUserDetails: (user) => {
		// setLocalStorage("access_token", token);
		setLocalStorage("user", user);
		// setLocalStorage("refreshToken", refreshToken);

		set((state) => {
			return {
				// accessToken: token,
				userData: user,
				// refreshToken
				// isLoggedIn: true,
			};
		});
	},

	_loginUser: (user, token, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", token);
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user,
                accessToken: token,
                refreshToken: refreshToken,
                isLoggedIn: true,
            };
        });
    },

    _handleRefreshToken: (accessToken, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", accessToken);
    
        set((_state) => {
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    },

	_logOutUser: () => {
		removeLocalStorageItem("user");
		removeLocalStorageItem("access_token");
		removeLocalStorageItem("refreshToken");
		// clearLocalStorage();

		set((state) => {
			// apiClient.post(`/admin/auth/logout`,
			// 	{ refresh_token: state.refreshToken }
			// ).then();

			return {
				userData: defaultUserData,
				isLoggedIn: false,
				accessToken: "",
				refreshToken: "",
			};
		});
	},
	 
    _handleRestoreUser: async () => {
        const user = await getLocalStorage("user");
        const accessToken =  await getLocalStorage("access_token");
        const refreshToken = await getLocalStorage("refreshToken");

        set((state) => {
            return {
                userData: user || state.userData,
                accessToken: accessToken || state.accessToken,
                refreshToken: refreshToken || state.refreshToken
            }
        });
    },
	
}));
