import { SignInValidationSchema } from "@/app";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FormInput } from "./FormInput";
import { commonStyles, GRADIENTS } from "./styles";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

interface SignInFormProps {
  onBack: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onBack }) => {
  const [firebaseError, setFirebaseError] = React.useState<string | null>(null);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setFirebaseError(null);

      // 🔐 Firebase sign-in call
      await signInWithEmailAndPassword(auth, values.email, values.password);

      // ✅ Success message only if login works
      Alert.alert("🎉 Login Successful", "Welcome back!");
      console.log("User signed in:", values.email);

      // Optional redirect after sign-in
      const router = require("expo-router").useRouter();
      router.replace("/home"); // change the path if needed

    } catch (error: any) {
      setFirebaseError(error.message || "Login Failed");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInValidationSchema}
      onSubmit={handleLogin}
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

          {/* Firebase Error Display */}
          {firebaseError && (
            <View style={{ marginBottom: 10, padding: 6 }}>
              <Text style={{ color: "red", textAlign: "center" }}>⚠️ {firebaseError}</Text>
            </View>
          )}

         {/* Submit Button */}
          <TouchableOpacity onPress={() => handleSubmit()} style={commonStyles.button}>
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
