import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
// import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useSettingStore } from '@/state/settingStore';
import { kolors } from '@/constants/Colors';


interface Component_Props {
    children: React.ReactNode,
    znapPointz: (string | number)[],
    // _reff: React.RefObject<BottomSheetModalMethods>,

    bgStyle?: StyleProp<Omit<ViewStyle, "position" | "top" | "left" | "bottom" | "right">>,
}

type _Props = Component_Props & React.ComponentProps<typeof BottomSheetModal>;

type Ref = BottomSheetModal;

// const AppBottomSheet: forwardRef React.FC<_Props> = ({ 
// const AppBottomSheet: forwardRef<Ref> = ({ 
// children, znapPointz, _reff, bgStyle = { borderRadius: 0 }, ...otherProp

const AppBottomSheet = forwardRef<Ref, _Props>(({ children, znapPointz, bgStyle = { borderRadius: 0 }, ...otherProp }, ref) => {
    const snapPoints = useMemo(() => znapPointz, []);
    const renderBackdrop = useCallback((props: any) => 
        <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} { ...props } />
    ,[]);
    // const { dismiss } = useBottomSheetModal(); 
    // const _ref = useRef<BottomSheetModal>(null);

    const appSettings = useSettingStore((state) => state.settings);

  
    return (
        <BottomSheetModal 
            ref={ref} 
            enablePanDownToClose={true}
            enableDismissOnClose={true}
            // enableDynamicSizing= {true}
            snapPoints={snapPoints} 
            overDragResistanceFactor={0}
            backgroundStyle={[
                {
                    borderRadius: 0,
                    backgroundColor: appSettings.theme == 'dark' ? kolors.dark.card : kolors.light.card
                }, 
                bgStyle 
            ]}
            handleIndicatorStyle={{ display: 'none' }}
            backdropComponent={renderBackdrop}
            { ...otherProp }
        >
          { children }
        </BottomSheetModal>
    )
});

export default AppBottomSheet;

// const styles = StyleSheet.create({})