import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//Screens
import ChatbotScreen from './screens/ChatbotScreen';
import NiksariCamera from './screens/CameraScreen'
import ModelScreen from './screens/ModelScreen';
import InstructionScreen from './screens/InstructionScreen';
//Screen names
const cameraScreen = "CameraScreen";
const chatbotScreen = "ChatbotScreen";


//Navigators
const Tab = createBottomTabNavigator(); // Create a TabNavigator
const Stack = createNativeStackNavigator(); // Create a StackNavigator
function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CameraScreen") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "ChatbotScreen") {
            iconName = focused ? "chat" : "chat-outline";
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={cameraScreen} component={NiksariCamera} />
      <Tab.Screen name={chatbotScreen} component={ChatbotScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        />
      <Stack.Screen name="ModelScreen" component={ModelScreen} />
      <Stack.Screen name="InstructionScreen" component={InstructionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
