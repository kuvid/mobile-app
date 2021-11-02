import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { DataProvider } from './src/context/DataContext';

export default function App()  {
  return(
    <DataProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </DataProvider>
  )
}

/*const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Attendance" component={AttendanceScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}*/

/* function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
} */