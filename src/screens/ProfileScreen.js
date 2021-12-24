import React, { useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../styles/Style";
import AuthContext from "../context/AuthContext";
import AttendanceDataContext from "../context/AttendanceDataContext";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const { cleanData } = useContext(AttendanceDataContext);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.redButton} onPress={signOut}>
          <Text style={styles.whiteButtonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
