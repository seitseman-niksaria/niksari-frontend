import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./routes/home";
import Furniture from "./routes/furniture";
import Instructions from "./routes/instructions";
import Login from "./routes/login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerScreenProps } from "@react-navigation/drawer";
import CameraApp from "./routes/CameraApp";
import Chatbot from "./routes/chatbot";


export default function App() {
  const Drawer = createDrawerNavigator(); // Create a DrawerNavigator

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Furniture" component={Furniture} />
        <Drawer.Screen name="Instructions" component={Instructions} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Camera" component={CameraApp} />
        <Drawer.Screen name="Chatbot" component={Chatbot} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


