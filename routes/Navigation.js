import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModelScreen from '../screens/ModelScreen';
import InstructionScreen from '../screens/InstructionScreen';
import Root from './Root';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Root'
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Model' component={ModelScreen} />
        <Stack.Screen name='Instruction' component={InstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
