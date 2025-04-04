import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {kolors} from '@/constants/Colors';
import { useSettingStore } from '@/state/settingStore';


interface MyComponentProps {
    startIcon?: React.ComponentProps<typeof Ionicons>['name'];
    endIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    errors?: boolean,
    onPressEndIcon?: () => any,
    // otherInputProps: TextInput['props'];
    startComponent?: JSX.Element;
    endComponent?: JSX.Element;
    textInputBgColor?: string; 
    inputStyles?: StyleProp<TextStyle>; 
}

export type TextInputProps = MyComponentProps & TextInput['props'];

const AppTextInput: React.FC<TextInputProps> = ({ 
    inputStyles, errors, startIcon, startComponent, endIcon, endComponent, 
    onPressEndIcon = () => {}, 
    textInputBgColor,
    ...otherProps 
}) => {
    const appSettings = useSettingStore((state) => state.settings);
    let _TextInputBgColor = appSettings.theme == "dark" ? kolors.theme.darkContent : kolors.theme.lightContent;
    if (textInputBgColor) _TextInputBgColor = textInputBgColor;

    return (
        <View style={[
            styles.container, 
            errors ? styles.inputError : null,
            { backgroundColor: _TextInputBgColor }
        ]}>
            { startComponent ? startComponent : startIcon && <Ionicons name={startIcon} size={20} /> }
            {/* { startIcon && <Ionicons name={startIcon} size={20} style={{ marginRight: 10 }} /> } */}

            <TextInput 
                { ...otherProps } 
                underlineColorAndroid="transparent" 
                style={[
                    styles.input,
                    // { color: appSettings.theme == "dark" ? "#f2f2f2" : "#0c0c0c" },
                    { color: "#0c0c0c" },
                    inputStyles
                ]} 
            />

            { endComponent ? endComponent : endIcon && <MaterialCommunityIcons onPress={onPressEndIcon} name={endIcon} size={20} style={{ color: appSettings.theme == "dark" ? "#f2f2f2" : "#0c0c0c" }} /> }
            {/* // { endIcon && <MaterialCommunityIcons onPress={onPressEndIcon} name={endIcon} size={20} style={{ marginLeft: 5 }} /> } */}
        </View>
    )
}

export default AppTextInput;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#F2EDEE", // kolors.theme.light,
        borderRadius: 5,
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        flex: 1,
        gap: 10,
        // paddingHorizontal: 12,
        borderWidth: 0.4,
        borderColor: kolors.theme.borderColor,
        marginVertical: 8,
        overflow: "hidden"
    },
    input: {
        fontSize: 18,
        // color: "#0c0c0c", // kolors.theme.textDark,
        flexGrow: 1,
        padding: 15,
        // paddingVertical: 8,
        borderWidth: 0,
    },
    inputError: {
        borderColor: kolors.theme.error
    },
})
