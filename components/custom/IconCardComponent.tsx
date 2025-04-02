import { TouchableOpacity } from 'react-native'
import React from 'react'

import IconComponent, { IconComponent_Props } from './IconComponent';
import AppText from './AppText';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';

interface _Props_ {
    cardTitle?: string,
    cardTitleFontSize?: number,
    cardWidth?: number | "100%" | "auto",
    cardHeight?: number | "100%" | "auto",
    onPressCard?: () => any,
};
type _Props = IconComponent_Props & _Props_;

const IconCardComponent: React.FC<_Props> = ({
    cardTitle, cardTitleFontSize = 18, onPressCard, cardWidth = 143, cardHeight = 118, ...otherProps 
}) => {
    const appSettings = useSettingStore((state) => state.settings);

    return (
        <TouchableOpacity 
            onPress={onPressCard}
            style={{
                // width: cardWidth || 143,
                maxWidth: cardWidth,
                minHeight: cardHeight,
                borderWidth: 2,
                borderColor: "#0000001A",
                borderRadius: 12,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appSettings.theme == 'dark' ? kolors.dark.card : kolors.light.card
            }}
        >
            { 
                cardTitle  && 
                <AppText style={{
                    fontSize: cardTitleFontSize,
                    marginTop: 10,
                    marginBottom: 15, 
                    textAlign: "center",
                    fontWeight: "600",
                }}>
                    { cardTitle }
                </AppText>
            }

            <IconComponent
                onPressIcon={onPressCard}
                { ...otherProps }
            />
        </TouchableOpacity>
    )
}

export default IconCardComponent;