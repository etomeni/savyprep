import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { listDataInterface } from './AppPicker';
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';



interface MyComponentProps {
    // PIotherTextProps?: Text['props'];

    selectedItem?: listDataInterface,
    
    displayRadioCheckmark?: boolean,

    PIonSelectItem: (item: listDataInterface) => any;
    listItem: listDataInterface,
}

type _Props = MyComponentProps & Text['props'];


const PickerItem: React.FC<_Props> = ({
    PIonSelectItem, listItem, selectedItem, displayRadioCheckmark = true, ...PIotherTextProps
}) => {
    return (
        <Pressable onPress={() => PIonSelectItem(listItem)} style={{
            paddingHorizontal: 15,
            paddingVertical: 7.5
        }}>
            <View style={{
                backgroundColor: selectedItem?.value == listItem.value ? kolors.theme.bgColor : kolors.theme.borderColor,
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                gap: 10,
                borderRadius: 5,
            }}>
                {
                    listItem.image ? (
                        <View style={styles.imgContainer}>
                            {
                                `${listItem.image}`.includes("placehold.co") ? 
                                    <Image
                                        style={styles.profileImage}
                                        source={{
                                            uri: listItem.image || 'https://placehold.co/100x100/grey/white',
                                        }}
                                    />
                                :
                                    <Image
                                        style={styles.profileImage}
                                        source={listItem.image || require("@/assets/tesaPayPlaceHolder.png")}
                                    />
                            }
                        </View>
                    ) : listItem.PIstartIcon ? (
                        <MaterialCommunityIcons name={listItem.PIstartIcon} size={20} />
                    ) : <></>
                }

                <View style={{flexGrow: 1, flexShrink: 1}}>
                    <AppText numberOfLines={1} {...PIotherTextProps} style={{
                        fontSize: 18,
                        // color: kolors.theme.textDark,
                    }}>
                        {listItem.label}
                    </AppText>

                    <AppText numberOfLines={1} style={{
                        color: "grey"
                    }}>{listItem.subLabel}</AppText>
                </View>


                { displayRadioCheckmark && (
                    <MaterialCommunityIcons 
                        name={selectedItem?.value == listItem.value ? "check-circle" : "radiobox-blank" } 
                        color={selectedItem?.value == listItem.value ? kolors.theme.primary : "grey" } 
                        size={20} 
                    />
                )}
            </View>
        </Pressable>
    )
}

export default PickerItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: kolors.theme.bgColor,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        // width: "100%",
        padding: 15,
        gap: 10,

        borderWidth: 0.4,
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        // color: kolors.theme.textDark,
        flexGrow: 1
        // textAlignVertical: 'top'
    },
    imgContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: kolors.theme.light,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 45,
        height: 45,
        objectFit: "contain"
    },
    
})