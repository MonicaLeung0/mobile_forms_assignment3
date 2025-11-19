import { commonStyles, EmployeeValidationSchema, GRADIENTS } from '../app/index';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FormInput } from './FormInput';

interface EmployeeFormProps {
    onBack: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onBack }) => {
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
                program: '',
                department: 'School of Advamced Digital Technology',
            }}
            validationSchema={EmployeeValidationSchema}
            onSubmit={(values, {resetForm}) => {
                Alert.alert('Success', `Employee ${values.name} registered!`);
                console.log('Employee Data:', values);
                resetForm();
            }}
            > 
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView style={commonStyles.formContainer}>
                    <Text style={commonStyles.title}> SAIT Employee Information</Text>

                    <FormInput
                        label='Full Name'
                        icon=""
                        placeholder='John Doe'
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={errors.name}
                        touched={touched.name}/>

                    <FormInput 
                        label="SAIT Email"
                        icon=""
                        placeholder='john.doe@sait.ca'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        keyboardType="email-address"
                        autoCapitalize='none'/>

                    <FormInput
                        label="Phone Number"
                        icon=""
                        placeholder='4031234567'
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        error={errors.phone}
                        touched={touched.phone}
                        keyboardType='phone-pad'
                        maxLength={10}/>

                    <FormInput
                        label='Course/Program'
                        icon=''
                        placeholder='Software Development'
                        value={values.program}
                        onChangeText={handleChange('program')}
                        onBlur={handleBlur('program')}
                        error={errors.program}
                        touched={touched.program}/>

                    <FormInput
                        label='Department'
                        icon=''
                        value={values.department}
                        onChangeText={handleChange('department')}
                        onBlur={handleBlur('department')}
                        error={errors.department}
                        touched={touched.department}/>
                            
                    <TouchableOpacity onPress={() => handleSubmit()} style={commonStyles.button}>
                        <LinearGradient
                            colors={GRADIENTS.employee}
                            style={commonStyles.gradient}
                            start={{ x:0, y: 0}}
                            end={{ x:1, y:0}}>
                            
                                <Text style={commonStyles.buttonText}>Submit Employee Info </Text>
                            </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={onBack} style={commonStyles.backButton}>
                        <Text style={commonStyles.backButtonText}>Back to Menu</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </Formik>
        );
};