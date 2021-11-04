import React from "react";
import { TouchableOpacity, Text } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator } from "./StackNavigator";
import { ProfileStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({signout}) => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={MainStackNavigator}/>
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} initialParams={{signout}}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;