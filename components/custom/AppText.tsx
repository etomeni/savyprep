import { Text } from 'react-native'
import React from 'react'
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';


interface Component_Props {
    children: React.ReactNode,
}
type TextProps = Component_Props & Text['props'];


const AppText: React.FC<TextProps> = ({ children, style, ...otherProps }) => {
    const appSettings = useSettingStore((state) => state.settings);

    return (
        <Text
            style={[{
                color: appSettings.theme == "dark" ? kolors.dark.text : kolors.light.text,
            }, style]} 
            { ...otherProps } 
        >{children}</Text>
    )
}

export default AppText;