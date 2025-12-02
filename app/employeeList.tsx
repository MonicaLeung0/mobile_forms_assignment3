import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { getEmployees } from "@/utils/employeeService";
import { commonStyles } from "@/components/styles";
import { useRouter } from "expo-router";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return (
      <View style={[commonStyles.formContainer, { alignItems: "center", marginTop: 40 }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading employees...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.formContainer}>
      <Text style={commonStyles.title}>Employee List</Text>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f0f0f0",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.program}</Text>
            <Text>{item.department}</Text>

            {/* Member 3 will add delete button here */}
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.back()}
        style={commonStyles.backButton}
      >
        <Text style={commonStyles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}