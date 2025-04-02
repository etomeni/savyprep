import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconComponent from './IconComponent';
import {kolors} from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppText from './AppText';


interface _Props {
    tierLevel: string,
    tierName?: string,
    tierIconName?: React.ComponentProps<typeof Ionicons>['name'],
}

const AcctTierComponent:React.FC<_Props> = ({
    tierLevel,
    tierIconName, tierName
}) => {
    const getIconName = () => {
        if (tierLevel == '1') {
            return "shield-outline";
        } else if (tierLevel == '2') {
            return "shield-half-outline";
        } else if (tierLevel == '3') {
            return "shield-checkmark";
        } else {
            return "shield";
        }
    }
    

    return (
        <View style={styles.container}>
            <IconComponent
                iconName={
                    tierIconName ? tierIconName : getIconName()
                }
                iconSize={26}
                iconBgColor={kolors.theme.secondry}
                iconColor='gold'
            />
            <AppText style={styles.textWrtiteUp}>
                { tierName ? tierName : "Tier " }
                { tierLevel }
            </AppText>
        </View>
    )
}

export default AcctTierComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // gap: 5,
    },
    textWrtiteUp: {
        color: "#fff",
        fontSize: 16,
        backgroundColor: kolors.theme.secondry,
        paddingLeft: 15,
        paddingRight: 8,
        borderRadius: 10,
        left: -15,
        zIndex: -1,
    }


});