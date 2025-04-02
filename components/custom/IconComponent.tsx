import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {kolors} from '@/constants/Colors';
import AppText from './AppText';
import { useSettingStore } from '@/state/settingStore';

export interface IconComponent_Props {
    iconName?: React.ComponentProps<typeof Ionicons>['name'],
    iconColor?: string,
    iconBgColor?: string,
    iconTitleText?: string,
    iconSize?: number,
    iconTitleFontSize?: number,
    onPressIcon?: () => any,
    otherIconComp?: JSX.Element;
}

const IconComponent:React.FC<IconComponent_Props> = ({
    iconBgColor = kolors.theme.light, 
    iconTitleText, 
    iconTitleFontSize = 16, 
    iconColor = kolors.theme.primary, 
    iconName = "apps-outline", 
    onPressIcon = () => {}, 
    iconSize = 48,
    otherIconComp
}) => {
    const appSettings = useSettingStore((state) => state.settings);
    
    return (
        <TouchableOpacity 
            onPress={onPressIcon}
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{
                padding: 10,
                borderRadius: iconSize / 2,
                backgroundColor: appSettings.theme == "dark" ? kolors.dark.card : iconBgColor,
            }}>
                { otherIconComp ? otherIconComp : iconName && <Ionicons name={iconName} size={iconSize * 0.5} color={iconColor} /> }
            </View>

            { 
                iconTitleText  && 
                <AppText style={{
                    fontSize: iconTitleFontSize,
                    marginVertical: 5,
                    textAlign: "center",
                }}>
                    { iconTitleText }
                </AppText>
            }
        </TouchableOpacity>
        
    );
}

export default IconComponent;