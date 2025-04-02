import React from 'react'
import { kolors } from '@/constants/Colors';
import AppText from '@/components/custom/AppText';


interface MyComponentProps {
    message: string, 
    status: boolean, 
    display: boolean
}

const ApiResponse: React.FC<MyComponentProps> = ({ message, status, display }) => {
    if (!display) return null;

    return (
        <AppText style={{
            padding: 15,
            backgroundColor: status ? kolors.theme.successBg : kolors.theme.bgColor,
            marginVertical: 20,
            borderRadius: 5,
            borderColor: status ? kolors.theme.success : kolors.theme.error,
            borderWidth: 1,
            color: status ? kolors.theme.success : kolors.theme.error,
            overflow: "hidden"
        }}>
          { message }
        </AppText>
    )
}

export default ApiResponse;