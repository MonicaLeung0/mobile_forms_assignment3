import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmployeeForm from '../components/EmployeeForm';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { GRADIENTS } from '../constants/styles';



export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'employee' | 'signin' | 'signup'>('menu');

  if (currentScreen === 'employee') {
    return <EmployeeForm onBack= {() => setCurrentScreen('menu')} />;

  }
  if (currentScreen === 'signin') {
    return <SignInForm onBack = {() => setCurrentScreen('menu')} />;
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