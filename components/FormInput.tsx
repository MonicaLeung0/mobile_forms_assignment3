import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { commonStyles } from './styles';

interface FormInputProps extends TextInputProps {
    label: string;
    error?: string;
    touched?: boolean;
    icon?: string;
}
 export const FormInput : React.FC<FormInputProps> = ({
    label,
    error,
    touched,
    icon,
    ...props
 }) => {
    return (
        <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>
                {icon} {label}
            </Text>

            <TextInput 
                style={[
                    commonStyles.input,
                    error && touched && commonStyles.inputError
                ]}
                placeholderTextColor='#999'
                {...props}/>

                {error && touched && (
                    <Text style={commonStyles.errorText}>{error}</Text>
                )}
        </View>
    );
 };


