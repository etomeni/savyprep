import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, 
} from 'react-native';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettingStore } from '@/state/settingStore';
import AppBottomSheet from '@/components/custom/AppBottomSheet';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { idTypes } from '@/util/resources';
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';


interface _Props {
    // placeholder?: string;
    onSelectItem: (item: typeof idTypes[0]) => any;
    selectedItem: typeof idTypes[0] | undefined,
    title?: string;
}

const SelectIdTypeComponent: React.FC<_Props> = ({
    onSelectItem, selectedItem, title
}) => {
    const appSettings = useSettingStore((state) => state.settings);
    let _TextInputBgColor = appSettings.theme == "dark" ? kolors.theme.darkContent : kolors.theme.lightContent;

    const idTypeRef = useRef<BottomSheetModal>(null);
    const { dismiss } = useBottomSheetModal(); 

    const themeStyles = StyleSheet.create({
        contentBg: {
            backgroundColor: appSettings.theme == 'dark' ? kolors.dark.card : kolors.light.card
        },
        subContentBg: {
            backgroundColor: appSettings.theme == "dark" ? kolors.theme.darkContent : kolors.theme.lightContent,
        }
    });


    return (
        <>
            <TouchableWithoutFeedback onPress={() => { idTypeRef.current?.present() }}>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: _TextInputBgColor || kolors.theme.borderColor,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 15,
                    borderRadius: 5,
                }}>
                    <AppText style={styles.countryText}>
                        { selectedItem?.name || "Select type of ID" }
                    </AppText>

                    <Ionicons name='chevron-down' size={20} color="gray" />
                </View>
            </TouchableWithoutFeedback>

            <AppBottomSheet ref={idTypeRef} znapPointz={["37%"]} bgStyle={{borderRadius: 12}}>
                <View style={{padding: 15, paddingTop: 0 }}>

                    <View style={styles.bottemSheetTitleContainer}>
                        <AppText style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            // marginBottom: 15,
                        }}>{ title ? title : "Select ID Type" }</AppText>

                        <View style={{
                            padding: 5,
                            borderRadius: 20,
                            backgroundColor: kolors.theme.bgColor,
                        }}>
                            <Ionicons name='close-circle' size={20} 
                                color={kolors.theme.primary}
                                onPress={() => dismiss() }
                            />
                        </View>
                    </View>

                    <View style={{ gap: 10 }}>
                        {
                            idTypes.map((item) => (
                                <AppText key={item.id}
                                    style={[
                                        styles.bsTransferText, 
                                        // themeStyles.subContentBg,
                                        selectedItem?.name == item.name ? { backgroundColor: kolors.theme.bgColor } : themeStyles.subContentBg,
                                        
                                    ]}
                                    onPress={() => { onSelectItem(item); dismiss(); }}
                                >{ item.name }</AppText>
                            ))
                        }
                    </View>
                </View>
            </AppBottomSheet>
        </>
    )
}

export default SelectIdTypeComponent;

const styles = StyleSheet.create({
    bottemSheetTitleContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25
    },
    bsTransferText: {
        // backgroundColor: "#F2EDEE",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: "500"
    },

    countryText: {
        fontSize: 18,
        fontWeight: "400"
    }

})