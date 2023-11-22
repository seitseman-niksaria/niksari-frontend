import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

// This is the screen of furniture model
export default function ModelScreen() {
  const route = useRoute();
  const { furnitureName } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is {furnitureName} screen</Text>
    </View>
  );
}
