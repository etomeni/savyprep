import { StyleSheet, Text } from 'react-native';
import React from 'react';
import {kolors} from '@/constants/Colors';


interface MyComponentProps {
    error: string;
}

const FormErrorMsg: React.FC<MyComponentProps> = ({ error }) => {
    if (!error) return null;

    return <Text>{ error }</Text>;
}

export default FormErrorMsg;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: kolors.theme.error
    }
});