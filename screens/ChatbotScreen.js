import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { fetchModels, fetchInstructions } from '../helpers/api';
import BotResponse from '../components/Chatbot/BotResponse';
import BotQuestion from '../components/Chatbot/BotQuestion';
import UserResponse from '../components/Chatbot/UserResponse';

export default function ChatbotScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [descriptionExpected, setDescriptionExpected] = useState(false);
  const [instructionExpected, setInstructionExpected] = useState(false);
  const [models, setModels] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // Set all furniture models in to a models useState.
    // HTTP GET request is located in components/api.js.
    fetchModels().then((resp) => {
      setModels(resp);
    });
    // Set all instructions in to an instructions useState.
    // HTTP GET request is located in components/api.js.
    fetchInstructions().then((resp) => {
      setInstructions(resp);
    });
    // Set initial bot message on page load.
    const msg = BotQuestion({
      text: 'Welcome to the Chatbot! How can I help you?',
    });
    setMessages([msg]);
  }, []);

  // Function to get instruction by name
  const getInstruction = (iName) => {
    const instruction = instructions.map((i) => {
      if (i.instruction_name === iName) {
        return i.instruction_text;
      }
    });
    return instruction;
  };

  // Function that handles user input sends
  const onSend = (messages = []) => {
    const msg = messages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // If user is looking for description of a model
    if (descriptionExpected) {
      modelDescription(msg.text);
      setDescriptionExpected(false);
      // If user is looking for care instructions of a model
    } else if (instructionExpected) {
      modelInstruction(msg.text);
      setInstructionExpected(false);
    }
  };

  // Function that returns description of a furniture model
  // by model name provided by user
  const modelDescription = (userInput) => {
    const model = models.find(
      (m) => m.furniture_name === userInput.toUpperCase()
    );
    console.log(model);
    // If the furniture model is found with the name given by the user,
    // the description of the model is saved in the messages useState.
    if (model) {
      const msg = BotResponse({
        text: `Description of ${model.furniture_name} model: \n\n${model.furniture_description}`,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
      // If model is not found then negative responce is saved in messages useState.
    } else {
      const msg = BotResponse({
        text: `There is no model named ${userInput}. Try again!`,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
    }
    // Returns the options again, with a different greeting
    // id and time (doesn't matter if info is found or not).
    const msg = BotQuestion({
      text: 'Do you need help with anything else?',
    });
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  };

  // Function that returns care instructions of a furniture model.
  // Instructions depends if model is outdoor or have leather materials in it.
  // This function lacks of logic for if model is outdoor and
  // leather at the same time.
  // Note! This function should be improved during the next sprint.
  const modelInstruction = (userInput) => {
    const model = models.find(
      (m) => m.furniture_name === userInput.toUpperCase()
    );
    // If model name is spelled wrong or model does not exist
    if (!model) {
      const msg = BotResponse({
        text: `There is no model named ${userInput}. Try again!`,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
      // If model is outdoor, then this instructions will be sent to a user.
    } else if (model.outdoor === true) {
      const msg = BotResponse({ text: getInstruction('Outdoor') });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
      // If model has leather materials in it, then this instructions is returned.
    } else if (model.leather === true) {
      const msg = BotResponse({
        text: `${getInstruction('Elmo leather')}\n\n${getInstruction(
          'Vegetable tanned leather'
        )}`,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
      // If model lacks any of the above, then user is provided
      // with general care instructions.
    } else {
      const msg = BotResponse({ text: getInstruction('General') });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
    }
    const msg = BotQuestion({
      text: 'Do you need help with anything else?',
    });
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  };

  // chosen option turns into user's message and shows up on screen
  const simulateUserMessage = (selectedOption) => {
    const msg = UserResponse({ text: selectedOption.title });
    // normal flow of the chat
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
    // when user chooses an option, this triggers the bot's response
    handleOptionSelected(selectedOption);
  };

  const handleOptionSelected = (selectedOption) => {
    let botResponseText = '';
    switch (selectedOption.value) {
      case 'camera':
        botResponseText =
          'Sure! I will help you with identifying a furniture. Please provide me with a picture of the furniture';
        navigation.navigate('Camera');
        break;
      case 'instructions':
        botResponseText = 'Sure! Please provide me with a model name.';
        setInstructionExpected(true);
        onSend();
        break;
      case 'info':
        botResponseText = 'Sure! Please provide me with a model name.';
        setDescriptionExpected(true);
        onSend();
        break;
      default:
        botResponseText =
          "I didn't understand your selection. Please try again.";
        break;
    }

    // update the chat messages with the bot's response
    const msg = BotResponse({ text: botResponseText });
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 'user',
        name: 'User',
      }}
      onQuickReply={(quickReply) => {
        simulateUserMessage(quickReply[0]);
      }}
    />
  );
}
