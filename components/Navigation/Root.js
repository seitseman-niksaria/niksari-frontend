import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraScreen from '../../screens/CameraScreen';
import ChatbotScreen from '../../screens/ChatbotScreen';

const Tab = createMaterialBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Chatbot'
        component={ChatbotScreen}
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chat' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Camera'
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='camera' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Root;
