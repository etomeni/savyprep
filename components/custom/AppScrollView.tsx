import { FlexStyle, ScrollView, useWindowDimensions, View } from 'react-native';
import React from 'react';

interface _Props {
    children: React.ReactNode,
    bgColor?: string,
    contentPadding?: number
    contentJustifyContent?: FlexStyle["justifyContent"],
    contentStyle?: React.ComponentProps<typeof View>['style'],
}

const AppScrollView:React.FC<_Props> = ({ 
    children, contentStyle, 
    bgColor = "#eef8fc",
    contentPadding = 15, contentJustifyContent = "center"
}) => {
    const { height } = useWindowDimensions();

    return (
        <View style={[{flex: 1}, {backgroundColor: bgColor} ]}>
            <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                <View style={[
                    {
                        // minHeight: height - 60,
                        minHeight: height,
                        justifyContent: contentJustifyContent,
                        padding: contentPadding,
                    },
                    contentStyle
                ]}>
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}

export default AppScrollView;
