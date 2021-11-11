import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import HomeScreen from "../screens/HomeScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationScreen from "../screens/NotificationScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={screenStyle} >
            <Stack.Screen name="Welcome to KUVID!" component={HomeScreen} options={{
          headerRight: ()=>(<TouchableOpacity style={ [{paddingHorizontal:15}] }
          onPress={() => navigation.navigate({ routeName: 'Notifications'})}>
          <Icon
            name="bell"
            type='material-community'
            size={24}
            iconStyle={{ color: "#7719B2" }}/>
        </TouchableOpacity>)
        }}/>
            <Stack.Screen name="Attendance" component={AttendanceScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
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

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenStyle} >
            <Stack.Screen name="Login" component={LoginScreen}/> 
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