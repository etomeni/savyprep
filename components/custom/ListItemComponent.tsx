import { View } from 'react-native';
import React from 'react';
import { kolors } from '@/constants/Colors';
import IconComponent, { IconComponent_Props } from './IconComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { View } from './Themed';
import { useSettingStore } from '@/state/settingStore';
import AppText from './AppText';



interface _Props_ {
    itemTitle: string,
    itemSubTitle?: string,
    itemTitleColor?: string

    // onPressItem?: () => any,
    itemBorderColor?: string,
};
export type listItem_Props = IconComponent_Props & _Props_;

const ListItemComponent:React.FC<listItem_Props> = ({ 
    itemTitle, itemSubTitle, itemTitleColor, itemBorderColor, iconName, iconBgColor, ...otherProps 
}) => {
    const appSettings = useSettingStore((state) => state.settings);

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                borderWidth: 2,
                // borderColor: itemBorderColor || kolors.theme.borderColor,
                borderColor: itemBorderColor || appSettings.theme == "dark" ? kolors.dark.border : kolors.light.border, // themekolors.borderColor,
                backgroundColor: appSettings.theme == "dark" ? kolors.dark.card : kolors.light.card,
                padding: 10,
                borderRadius: 10,
                marginVertical: 5
            }}
        >
            <IconComponent
                iconName={iconName || 'add'}
                iconBgColor={iconBgColor || kolors.theme.borderColor}
                { ...otherProps }
            />

            <View style={{ 
                flexGrow: 1,
                flexShrink: 1
            }}>
                <AppText numberOfLines={1} style={[
                    { fontSize: 18, fontWeight: "600" },
                    itemTitleColor ? { color: itemTitleColor } : {
                        color: appSettings.theme == "dark" ? kolors.dark.text : kolors.light.text
                    },
                ]
                }>
                    { itemTitle }
                </AppText>
                <AppText numberOfLines={1} style={{color: "grey"}}>
                    { itemSubTitle }
                </AppText>
            </View>

            <Ionicons name="chevron-forward" size={20} color="grey" />
        </View>
    )
}

export default ListItemComponent;