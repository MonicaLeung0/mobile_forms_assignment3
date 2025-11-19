import React from "react";
import { ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { FormInput } from "./FormInput";
import { SignInValidationSchema, commonStyles, GRADIENTS } from "../app/index";

interface SignInFormProps {
  onBack: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onBack }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInValidationSchema}
      onSubmit={(values) => {
        Alert.alert("Success", `Welcome back, ${values.email}!`);
        console.log("Sign In Data:", values);
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
          <Text style={commonStyles.title}>🔐 Sign In</Text>
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
            placeholder="Enter your password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={commonStyles.button}
          >
            <LinearGradient
              colors={GRADIENTS.signIn}
              style={commonStyles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={commonStyles.buttonText}>Sign In</Text>
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
