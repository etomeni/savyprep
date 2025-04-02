// import { FlexAlignType } from 'react-native'
import React from 'react';
import IconComponent from './IconComponent';
import { useRouter } from 'expo-router';


export interface BackBtn_Props {
    color?: string,
    bgColor?: string,
    size?: number,
    // alignment?: FlexAlignType
    closeBtn?: () => void
}

const BackBtnComponent:React.FC<BackBtn_Props> = ({
    color = '#fff', bgColor = '#FCFCFC80', size = 30, closeBtn 
}) => {
    const router = useRouter();

    return (
        <IconComponent
            iconName='arrow-back' 
            iconColor={color}
            iconBgColor={bgColor}
            iconSize={size}
            onPressIcon={() => {
                if (closeBtn) {
                    closeBtn()
                } else {
                    router.back();
                };

                // if (router.canGoBack()) {
                //     router.back();
                //     return;
                // } 
            }}
        />
    )
}

export default BackBtnComponent;