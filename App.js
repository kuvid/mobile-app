import * as React from "react";
import Amplify from "aws-amplify";
import awsConfig from "./src/aws-exports";
import AuthLoadingScreen from "./src/navigation/AuthLoadingScreen";
import { AttendanceDataProvider } from "./src/context/AttendanceDataContext";
import { AuthProvider } from "./src/context/AuthContext";
import { CovidStatusProvider } from "./src/context/CovidStatusContext";
import { StudentListProvider } from "./src/context/StudentListContext";

Amplify.configure(awsConfig);

//import { withAuthenticator } from "aws-amplify-react-native";

export default function App() {
  return (
    <AuthProvider>
      <AttendanceDataProvider>
        <StudentListProvider>
          <CovidStatusProvider>
            <AuthLoadingScreen />
          </CovidStatusProvider>
        </StudentListProvider>
      </AttendanceDataProvider>
    </AuthProvider>
  );
}

//export default withAuthenticator(App);

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
