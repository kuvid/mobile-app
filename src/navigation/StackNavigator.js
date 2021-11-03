import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({signout}) => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={screenStyle} >
            <Stack.Screen name="Welcome to KUVID!" component={HomeScreen}/>
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
            <Stack.Screen name="My Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenStyle} >
            <Stack.Screen name="My Profile" component={ProfileScreen} /> 
        </Stack.Navigator>
    )
}

const AuthStackNavigator = ({login}) => {
    return (
        <Stack.Navigator screenOptions={screenStyle} >
            <Stack.Screen name="Login"> 
                <LoginScreen login={login}/>
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const screenStyle = {
    headerStyle: {
      backgroundColor: '#EFEBFF',
    },
    headerTintColor: '#7719B2',
    headerBackTitle: "Back",
  }

export { MainStackNavigator, ProfileStackNavigator, AuthStackNavigator };