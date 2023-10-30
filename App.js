import { NavigationContainer } from "@react-navigation/native";
import Home from "./routes/home";
import Furniture from "./routes/furniture";
import Instructions from "./routes/instructions";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chatbot from "./routes/chatbot";
import NiksariCamera from "./routes/NiksariCamera";


export default function App() {
  const Drawer = createDrawerNavigator(); // Create a DrawerNavigator

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Furniture" component={Furniture} />
        <Drawer.Screen name="Instructions" component={Instructions} />
        <Drawer.Screen name="Camera" component={NiksariCamera} />
        <Drawer.Screen name="Chatbot" component={Chatbot} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


