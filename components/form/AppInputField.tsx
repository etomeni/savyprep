import { StyleSheet, Text } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { kolors } from '@/constants/Colors';

import AppTextInput, { TextInputProps } from './Input';
// import { useSettingStore } from '@/state/settingStore';


interface MyComponentProps {
    name: string,
    defaultValue?: string,
    control: Control<any, any>,
    errorz: FieldErrors<any>,
}
type _Props = MyComponentProps & TextInputProps;

const AppInputField: React.FC<_Props> = ({ 
    name, defaultValue = "", control, errorz, ...otherProps 
}) => {
    // const appTheme = useSettingStore((state) => state.theme);

    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput 
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        errors={errorz[name] ? true : false}
                        // textInputBgColor={appTheme == "dark" ? "green" : "#F2EDEE"}

                        { ...otherProps }
                    />
                )}
            />

            {errorz[name] && <Text style={styles.errorText}>
                { errorz[name]?.message?.toString() }
            </Text>}
        </>
    )
}

export default AppInputField

const styles = StyleSheet.create({
    errorText: {
        color: kolors.theme.error
    },
})