import { ActivityIndicator, DimensionValue, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';



interface MyComponentProps {
    onPress: () => any;
    text: string;
    disabled?: boolean;
    textColor?: string;
    loadingIndicator?: boolean;
    btnTextTransform?: "uppercase" | "lowercase" | "capitalize" | "none"
    btnOutline?: boolean;
    btnBgColor?: string;
    // menuOptions?: JSX.Element;
    btnSecondaryBgColor?: string;
    disabledColor?: string;
    btnWidth?: DimensionValue
    
}

const AppButton: React.FC<MyComponentProps> = (
    {
        onPress, 
        btnTextTransform = "uppercase", 
        disabled = false, 
        text = "Submit", 
        loadingIndicator = true, 
        textColor = "#fff",
        btnOutline = false,
        btnBgColor = kolors.theme.primary,
        btnSecondaryBgColor,
        disabledColor = "grey", // kolors.theme.bgColor
        btnWidth = "auto",
    }
) => {

    return (
        <TouchableHighlight
            onPress={onPress}
            disabled={ disabled }
            style={{
                backgroundColor: btnOutline ? "transparent" : disabled ? disabledColor : btnBgColor,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,

                borderWidth: 1,
                borderColor: disabled ? disabledColor : btnBgColor,
                width: btnWidth
            }}
            underlayColor={btnSecondaryBgColor ? btnSecondaryBgColor : btnOutline ? btnBgColor : kolors.theme.secondry}
        >
            {
                loadingIndicator ? 
                    <ActivityIndicator size="small" color={textColor} />
                : 
                <AppText style={{
                    // color: "#fff",
                    fontSize: 14,
                    textAlign: "center",
                    paddingHorizontal: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    textTransform: btnTextTransform,
                    color: btnOutline ? btnBgColor : textColor
                }}> { text } </AppText>
            }
        </TouchableHighlight>  
    )
}

export default AppButton;

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: kolors.theme.primary,
        borderRadius: 10,
        padding: 15,
    },
    btnText: {
        // color: "#fff",
        textAlign: "center",
        textTransform: "uppercase"
    },
})