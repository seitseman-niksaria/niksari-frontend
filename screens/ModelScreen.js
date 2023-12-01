import { View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, Button, Divider } from 'react-native-paper';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// This is the screen of furniture model
export default function ModelScreen() {
  const route = useRoute();
  const { model, instructions } = route.params;

  const navigation = useNavigation();

  // This function finds matching ids
  const findMatchingInstructions = () => {
    // Extract the instruction IDs from the model
    const modelInstructionIds = model.instructions;
    // Filter the instructions based on the extracted IDs
    const matchingInstructions = instructions.filter((instruction) =>
      modelInstructionIds.includes(instruction.id)
    );
    return matchingInstructions;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text variant='headlineLarge'>{model.furniture_name}</Text>
      </View>
      <Divider style={styles.divider} />
      <ScrollView style={styles.description}>
        <Text variant='bodyMedium'>{model.furniture_description}</Text>
      </ScrollView>
      <Divider style={styles.divider} />
      <View style={styles.instructions}>
        <Text variant='titleSmall'>
          Care instructions for {model.furniture_name} {'\n'}
        </Text>
        <FlatList
          data={findMatchingInstructions()}
          renderItem={({ item }) => (
            <Button
              labelStyle={styles.buttonText}
              mode='text'
              onPress={() => {
                navigation.navigate('Instruction', {
                  instruction: item,
                });
              }}
            >
              {item.instruction_name}
            </Button>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    width: '90%',
  },
  description: {
    flex: 1,
    borderColor: 'black',
    padding: 20,
    width: '90%',
  },
  instructions: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    width: '85%',
  },
});
