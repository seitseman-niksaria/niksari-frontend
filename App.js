import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chatbot from './screens/ChatbotScreen';
import NiksariCamera from './screens/CameraScreen';

export default function App() {
  const Drawer = createDrawerNavigator(); // Create a DrawerNavigator

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Chatbot'>
        <Drawer.Screen name='Camera' component={NiksariCamera} />
        <Drawer.Screen name='Chatbot' component={Chatbot} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
