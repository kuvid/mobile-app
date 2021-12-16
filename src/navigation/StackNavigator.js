import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import HomeScreen from "../screens/HomeScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CourseListScreen from "../screens/CourseListScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import TakeAttendanceScreen from "../screens/TakeAttendanceScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={screenStyle}>
      <Stack.Screen name="Welcome" component={HomeScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="CourseList" component={CourseListScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="TakeAttendance" component={TakeAttendanceScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenStyle}>
      <Stack.Screen name="My Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const screenStyle = {
  headerStyle: {
    backgroundColor: "#EFEBFF",
  },
  headerTintColor: "#7719B2",
  headerBackTitle: "Back",
};

export { MainStackNavigator, ProfileStackNavigator, AuthStackNavigator };
