import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./routes/home";
import Furniture from "./routes/furniture";
import Instructions from "./routes/instructions";

const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}  />
        <Tab.Screen name="Furniture" component={Furniture} />
        <Tab.Screen name="Instructions" component={Instructions}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/