import { StyleSheet, View } from 'react-native'
import React from 'react'
import BackBtnComponent, { BackBtn_Props } from './BackBtnComponent';
import {kolors} from '@/constants/Colors';
import AppText from './AppText';


interface Header_Props {
    hPageTitle?: string,
    hEndMenuComp?: JSX.Element;
    hBgColor?: string;
}

type _Props = Header_Props & BackBtn_Props;

const HeaderComponent:React.FC<_Props> = ({
    hPageTitle, hBgColor, hEndMenuComp = <View></View>, ...otherProps
}) => {

    return (
        <View style={[
            {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: 15,
            },
            hBgColor ? {backgroundColor: hBgColor} : null
        ]}>
            <View>
                <BackBtnComponent 
                    color={kolors.theme.primary} 
                    bgColor={kolors.theme.borderColor}
                    // alignment='center'
                    {...otherProps}
                />
            </View>

            <AppText
                style={{
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                    
                    // The postioning is experimental and can be deleted if it gives issue
                    // on other device
                    position: "relative",
                    left: "-50%"
                }}
                numberOfLines={1}
            >{ hPageTitle }</AppText>


            <View>
                { hEndMenuComp }
            </View>
        </View> 
    )
}

export default HeaderComponent;

const styles = StyleSheet.create({})