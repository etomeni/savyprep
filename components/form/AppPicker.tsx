import { StyleSheet, Text, View, TouchableWithoutFeedback, Modal, FlatList, Image, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import PickerItem from './PickerItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';


interface MyComponentProps {
    startIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    endIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    otherTextProps?: Text['props'];
    placeholder?: string;
    onSelectItem: (item: listDataInterface) => any;
    selectedItem?: listDataInterface,
    title: string;
    closeText?: string;
    displaySearch?: boolean,
    displayEndRadioIcon?: boolean,
    // listItem: JSX.Element;
    listData: listDataInterface[]
}

export interface listDataInterface {
    value: string | number,
    label: string,

    subLabel?: string,
    image?: string,
    PIstartIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    endComponent?: JSX.Element;
}

const AppPicker: React.FC<MyComponentProps> = ({
    title = "Select", startIcon, endIcon = "chevron-down", 
    otherTextProps, placeholder = "Select", closeText = "cancel", 
    listData, selectedItem, onSelectItem, displayEndRadioIcon, displaySearch = false
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState(listData);
    
    const appSettings = useSettingStore((state) => state.settings);

    // updates the view when the data recieved changes.
    useEffect(() => {
        setOptions(listData);
    }, [listData])
    

    const handleSelect = (item: listDataInterface) => {
        onSelectItem(item);
        setModalVisible(false);
    }
    
    const handleSearch = (searchWord: string) => {
        if (searchWord && searchWord.length) {
            // Convert the query to lowercase for case-insensitive search
            const searchKeyWords = searchWord.toLowerCase();
            // Filter the Bible data based on the search query
            // OPTIMIZED WAY OF PERFORMING SEARCH LIMITS
            const _search_Results = [];
            // let count = 0;
            for (const obj of listData) {
                const modifiedText = obj.label + " " + obj.subLabel;
        
                const searchFields = modifiedText.toLowerCase();
                if (searchFields.includes(searchKeyWords)) {
                    _search_Results.push(obj);
                    // count++;
                }
            }
            
            if (_search_Results && _search_Results.length) {
              setOptions(_search_Results);
            } else {
              setOptions(listData);
            }
        }
        
    }


    const themeStyles = StyleSheet.create({
        contentBg: {
            backgroundColor: appSettings.theme == 'dark' ? kolors.dark.card : kolors.light.card
        },
        subContentBg: {
            backgroundColor: appSettings.theme == "dark" ? kolors.theme.darkContent : kolors.theme.lightContent,
        },
        bg: {
            backgroundColor: appSettings.theme == "dark" ? "#000" : "#fff",
        },
        text: {
            color: appSettings.theme == "dark" ? "#fff" : "#000",
        },
    });


    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[
                    styles.container, 
                    {
                        borderColor: themeStyles.subContentBg.backgroundColor,
                        backgroundColor: themeStyles.subContentBg.backgroundColor
                    }
                ]}>
                    { startIcon && <MaterialCommunityIcons name={startIcon} size={20} style={{ marginRight: 10 }} /> }
                    <AppText { ...otherTextProps } style={styles.text} >
                        { selectedItem ? selectedItem.label : placeholder }
                    </AppText>
                    { endIcon && <MaterialCommunityIcons name={endIcon} size={20} style={[themeStyles.text, { marginLeft: 5 }]} /> }
                </View>
            </TouchableWithoutFeedback>

            <Modal visible={modalVisible} animationType='slide' transparent>
                <AppSafeAreaView>
                    <View style={[themeStyles.bg]}>
                        <View style={styles.modalHeader}>
                            <AppText style={styles.close} onPress={() => setModalVisible(false)}>
                                { closeText }
                            </AppText>
                            <AppText style={{
                                flexGrow: 1, textAlign: "center", 
                                fontWeight: "500", fontSize: 18
                            }}> { title } </AppText>
                            <AppText style={{width: 45}}> </AppText>
                        </View>

                        { displaySearch && (
                            <View style={{paddingHorizontal: 15}}>
                                <View style={styles.searchWrap}>
                                    <Ionicons name="search" size={20} style={{ marginRight: 10 }} />
                                    <TextInput 
                                        underlineColorAndroid="transparent" 
                                        style={styles.searchInput} 

                                        onChangeText={(res) => {
                                            handleSearch(res);
                                        }}
                                            
                                        selectionColor={kolors.theme.secondry}
                                        placeholder="Search"
                                        placeholderTextColor={'gray'}
                                        keyboardType="web-search"
                                        returnKeyType="search"
                                        inputMode="search"
                                        enterKeyHint="search"
                                    />
                                </View>
                            </View>
                        )}


                        <FlatList
                            data={options}
                            showsVerticalScrollIndicator={false}
                            // keyExtractor={}
                            renderItem={({item, index}) => (
                                <PickerItem 
                                    PIonSelectItem={handleSelect}
                                    listItem={item}
                                    selectedItem={selectedItem}
                                    displayRadioCheckmark={displayEndRadioIcon}
                                    // PIotherTextProps={{style: {fontSize: 20}}}
                                />
                            )}
                        />
                    </View>
                 </AppSafeAreaView>
            </Modal>
        </>
    )
}

export default AppPicker;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: kolors.theme.light,
        borderRadius: 5,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        borderWidth: 0.4,
        // borderColor: kolors.theme.borderColor,
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        // color: kolors.theme.textDark,
        // color: kolors.theme.dark,
        flex: 1
        // textAlignVertical: 'top'
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", 
        gap: 10,
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: kolors.theme.borderColor
    },
    close: {
        color: kolors.theme.error,
        textTransform: "uppercase"
    },
    searchWrap: {
        backgroundColor: "#F2EDEE", // kolors.theme.light,
        // backgroundColor: kolors.theme.borderColor,
        borderRadius: 5,
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: kolors.theme.borderColor,
        marginVertical: 10
    },
    searchInput: {
        fontSize: 18,
        // color: kolors.theme.textDark,
        color: kolors.theme.dark,
        width: "100%",
        paddingVertical: 15,
        borderWidth: 0,
    },
})