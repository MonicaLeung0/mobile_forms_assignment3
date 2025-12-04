import { GRADIENTS } from '@/components/styles';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/logout';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const { user } =useAuth();

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    :"U";

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={GRADIENTS.header}
          style={styles.header}
          start={{x:0,y:0}}
          end={{x:1,y:0}}
          >
            <Text style={styles.headerTitle}>My Profile</Text>
          </LinearGradient>

          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>

            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user?.uid}</Text>
          </View>

          <TouchableOpacity onPress={logout} style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#ff5252","#ff1744"]}
              style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
              </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#f8f8f8",
  },
  header: {
    paddingTop: 70,
    paddingBottom:50,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius:25,
  },
  headerTitle: {
    color: "white",
    fontSize: 32,
    fontWeight:"bold",
  },
  card: {
    backgroundColor:"white",
    marginHorizontal:20,
    marginTop: -40,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: {width:0, height: 2},
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#eee",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 3,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#555",
  },
  label: {
    fontSize: 13,
    fontWeight:"bold",
    color: "#777",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  backText: {
    textAlign: "center",
    marginTop: 20,
    color:"#555",
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});