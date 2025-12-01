import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { FormInput } from "./FormInput";
import { commonStyles, GRADIENTS } from "./styles";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

interface SignUpFormProps {
  onBack: () => void;
}
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Confirm your password"),
});


export const SignUpForm: React.FC<SignUpFormProps> = ({ onBack }) => {
 const [firebaseError, setFirebaseError] = React.useState<string | null>(null);

  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      setFirebaseError(null);

      // Create account in Firebase
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // await createUserWithEmailAndPassword(auth, "test@gmail.com", "12345678");

      // Only show success if Firebase account is created
      Alert.alert("✅ Success", `Account created for ${values.name}!`);
      console.log("User signed up:", values.email);

    } catch (error: any) {
      setFirebaseError(error.message || "Sign Up Failed");
    }
  };

  return (
    <Formik<SignUpFormValues>
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
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
            placeholder="Min 6 characters"
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

          {/* Firebase Error Display */}
          {firebaseError && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: "red", textAlign: "center" }}>⚠️ {firebaseError}</Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity onPress={() => handleSubmit()} style={commonStyles.button}>
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
