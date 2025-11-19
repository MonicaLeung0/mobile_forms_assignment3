import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Yup from 'yup';
import { EmployeeForm } from '../components/EmployeeForm';
import SignInForm from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';


export const EmployeeValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/@sait\.ca$/, 'Must be a SAIT email (@sait.ca)')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone number is required'),
  program: Yup.string()
    .min(3, 'Program name too short')
    .required('Course/Program is required'),
  department: Yup.string()
    .required('Department is required'),
});

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const GRADIENTS = {
  employee: ['#ff6b9d', '#c44569'],
  signIn: ['#a770ef', '#cf8bf3', '#fdb99b'],
  signUp: ['#ffa500', '#ffd700', '#ffed4e'],
  header: ['#ff6b9d', '#a770ef', '#fdb99b']
  
} as const;

export const commonStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5, 
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
})


export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'employee' | 'signin' | 'signup'>('menu');

  if (currentScreen === 'employee') {
    return <EmployeeForm onBack={() => setCurrentScreen('menu')} />;

  }
  if (currentScreen === 'signin') {
    return <SignInForm onBack={() => setCurrentScreen('menu')} />;
  }
  if (currentScreen === 'signup') {
    return <SignUpForm onBack={() => setCurrentScreen('menu')} />;
  }

  


  return (
    <View
      style={styles.container}>
        <LinearGradient 
        colors={GRADIENTS.header}
        style={styles.headerGradient}>
          <Text style={styles.headerTitle}>SAIT Form System</Text>
          <Text style={styles.headerSubtitle}>Assignment 3</Text>
        </LinearGradient>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
          onPress={() => setCurrentScreen('employee')}
          style={styles.menuButton}>
            <LinearGradient
              colors={GRADIENTS.employee}
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
                <Text style={styles.menuIcon}></Text>
                <Text style={styles.menuButtonText}>Employee Information</Text>
              </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentScreen('signin')}
            style={styles.menuButton}>
              <LinearGradient
                colors={GRADIENTS.signIn}
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{ x: 1, y: 1}}>

                  <Text style={styles.menuIcon}></Text>
                  <Text style={styles.menuButtonText}>Sign In</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrentScreen('signup')} 
              style={styles.menuButton}>
                <LinearGradient
                colors={GRADIENTS.signUp}
                style={styles.gradient}
                start={{ x: 0, y: 0}}
                end={{ x: 1, y: 1}}>

                  <Text style={styles.menuIcon}></Text>
                  <Text style={styles.menuButtonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    padding: 40,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  menuContainer: {
    flex:1,
    justifyContent: 'center',
    padding: 20,
  },
  menuButton: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});