import { create } from "zustand";
import { kolors } from "@/constants/Colors";
import { getLocalStorage, setLocalStorage } from "@/util/storage";
// import { LoadingModalProps } from "@/components/LoadingModal";
import { LoadingModalProps } from "@/components/custom/LoadingModal";


interface settingsInterface {
    theme: "dark" | "light";
    pinState: boolean;
    appLoading: LoadingModalProps;
    displayPinModal: boolean;
}

const defaultLoading: LoadingModalProps = {
    display: false,
    success: false,
    overlayBgColor: kolors.theme.overlayBgColor,
};

const defaultSettings: settingsInterface = {
    theme: "light",
    pinState: false,
    appLoading: defaultLoading,
    displayPinModal: false
}

type _typeInterface_ = {
    // appLoading: LoadingModalProps;
    settings: typeof defaultSettings;

    _setTheme: (theme: "light" | "dark") => void;
    _setAppLoading: (theme: LoadingModalProps) => void;
    _restoreSettings: () => void;
    _setSettings: (settings: typeof defaultSettings) => void;
    _displayPinModal: (display: boolean) => void;
    _setPinState: (status: boolean) => void;

    // updatePlayerAsync: () => Promise<void>;
};

export const useSettingStore = create<_typeInterface_>((set) => ({
    // theme: defaultTheme,
    // appLoading: defaultLoading,
    settings: defaultSettings,

    _setTheme: (theme) => {
        set((state) => {
            const newSettings = {
                ...state.settings,
                theme,

                pinState: false,
                displayPinModal: false
            };

            setLocalStorage("settings", newSettings);
            return { settings: newSettings };
        });
    },

    _setAppLoading: (loading) => {
        set((state) => {
            const newSettings = {
                ...state.settings,
                appLoading: loading,

                pinState: false,
                displayPinModal: false
            };

            setLocalStorage("settings", newSettings);
            return { settings: newSettings };
        });
    },

    _setSettings: (settings) => {
        // set({settings});

        set((state) => {
            const newSettings = {
                ...state.settings,
                ...settings,
                pinState: false,
                displayPinModal: false
            };

            setLocalStorage("settings", newSettings);
            return { settings: newSettings, };
        });
    },

    _restoreSettings: () => {
        // const settings = await getLocalStorage("settings");
        
        set((state) => {
            const newSettings = {
                ...state.settings,
                // ...settings,

                pinState: false,
                displayPinModal: false
            };
            // setLocalStorage("settings", newSettings);
            return { settings: newSettings };
        });
    },

    _displayPinModal: (displayPin) => {
        set((state) => {

            return { settings: { ...state.settings, displayPinModal: displayPin } };
        });
    },
  
    _setPinState: (pinStatus) => {
        set((state) => {
            const newSettings = { 
                ...state.settings, 
                pinState: pinStatus,
                // displayPinModal: pinStatus ? false : state.settings.displayPinModal
            };

            return { settings: newSettings };
        });
    },
  
}));
