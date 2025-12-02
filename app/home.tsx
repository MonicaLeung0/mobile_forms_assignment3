import { GRADIENTS } from "@/components/styles";
import { logout } from "@/utils/logout";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmployeeForm } from "../components/EmployeeForm";

export default function Home() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<"menu" | "employee">(
    "menu"
  );

  if (currentScreen === "employee") {
    return <EmployeeForm onBack={() => setCurrentScreen("menu")} />;
  }

  if (currentScreen === "menu") {
    return (
      <View style={styles.container}>
        <LinearGradient colors={GRADIENTS.header} style={styles.headerGradient}>
          <Text style={styles.headerTitle}>Welcome!</Text>
          <TouchableOpacity onPress={logout}>
            <Text style={{ color: "white", marginTop: 10 }}>Sign Out</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => setCurrentScreen("employee")}
            style={styles.menuButton}
          >
            <LinearGradient colors={GRADIENTS.employee} style={styles.gradient}>
              <Text style={styles.menuButtonText}>Employee Form</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/employeeList")}
            style={styles.menuButton}
          >
            <LinearGradient colors={GRADIENTS.employee} style={styles.gradient}>
              <Text style={styles.menuButtonText}>View Employees</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerGradient: {
    padding: 40,
    paddingTop: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  menuButton: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: "center",
    borderRadius: 15,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  menuButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
