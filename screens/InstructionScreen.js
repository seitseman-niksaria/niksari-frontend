import { Text } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

// This screen shows instruction based on what instruction is chosen in ModelScreen.
const InstructionScreen = () => {
  const route = useRoute();
  const { instruction } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text variant='bodyMedium' style={styles.instruction}>
        {instruction.instruction_text}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instruction: {
    padding: 40,
  },
});

export default InstructionScreen;
