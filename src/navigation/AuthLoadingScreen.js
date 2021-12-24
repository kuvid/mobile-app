import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Auth from "@aws-amplify/auth";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator, MainStackNavigator } from "./StackNavigator";
import DrawerNavigator from "./DrawerNavigator";
import AuthContext from "../context/AuthContext";
import AttendanceDataContext from "../context/AttendanceDataContext";
import styles from "../styles/Style";
import StudentListContext from "../context/StudentListContext";
import CovidStatusContext from "../context/CovidStatusContext";

export default function AuthLoadingScreen() {
  const { token, loading, loadApp, group, idNumber } = useContext(AuthContext);
  const { pullData, cleanData } = useContext(AttendanceDataContext);
  const { getStudentList } = useContext(StudentListContext);
  const {
    getCovidStatus,
    checkIfContacted,
    getCurrentCovidCode,
    getDbDeviceStatus,
  } = useContext(CovidStatusContext);

  useEffect(() => {
    cleanData();
    loadApp();
  }, []);

  useEffect(() => {
    getCurrentCovidCode();
    checkIfContacted();
    getDbDeviceStatus();
    getCovidStatus();
    if (group === "Student") pullData();
    else {
      getStudentList();
    }
    console.log("idNumber: " + idNumber);
  }, [loading]);

  const showLoadingSpinner = !token && loading;
  var view = "";

  if (showLoadingSpinner) {
    view = (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  } else if (!token) {
    view = <AuthStackNavigator />;
  } else {
    view = <DrawerNavigator />;
  }
  return <NavigationContainer>{view}</NavigationContainer>;
}
