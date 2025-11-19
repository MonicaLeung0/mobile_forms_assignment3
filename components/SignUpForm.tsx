import React from "react";
import { ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { FormInput } from "./FormInput";
import { SignUpValidationSchema, commonStyles, GRADIENTS } from "../app/index";

interface SignUpFormProps {
  onBack: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onBack }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpValidationSchema}
      onSubmit={(values, { resetForm }) => {
        Alert.alert("Success", `Account created for ${values.name}!`);
        console.log("Sign Up Data:", values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <ScrollView style={commonStyles.formContainer}>
          <Text style={commonStyles.title}>✨ Create Account</Text>
          <FormInput
            label="Full Name"
            icon="👤"
            placeholder="John Doe"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
            touched={touched.name}
          />

          <FormInput
            label="Email"
            icon="📧"
            placeholder="your.email@sait.ca"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            label="Password"
            icon="🔒"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            secureTextEntry
          />

          <FormInput
            label="Confirm Password"
            icon="🔒"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={commonStyles.button}
          >
            <LinearGradient
              colors={GRADIENTS.signUp}
              style={commonStyles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={commonStyles.buttonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={commonStyles.backButton}>
            <Text style={commonStyles.backButtonText}>← Back to Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};
