import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { fetchModels, fetchInstructions } from '../helpers/api';
import BotResponse from '../components/Chatbot/BotResponse';
import BotQuestion from '../components/Chatbot/BotQuestion';
import UserResponse from '../components/Chatbot/UserResponse';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [infoExpected, setInfoExpected] = useState(false);
  const [models, setModels] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigation = useNavigation();

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

  // Function that handles user input sends
  const onSend = (messages = []) => {
    const msg = messages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // If user is looking for description of a model
    if (infoExpected) {
      modelInfo(msg.text);
      setInfoExpected(false);
    }
  };

  // Function that returns link to a furniture model page, where user can
  // see model decription and care isntructions.
  const modelInfo = (userInput) => {
    const model = models.find(
      (m) => m.furniture_name === userInput.toUpperCase()
    );
    // If the furniture model is found with the name given by the user,
    // Chatbot will response with link to a model page
    if (model) {
      const msg = BotResponse({
        text: (
          <Text>
            I found model you were looking for. You can click the button below
            to go to the {userInput.toUpperCase()} model page.
          </Text>
        ),
      });
      const link = BotResponse({
        text: (
          <Button
            style={{ paddingTop: 10 }}
            mode='text'
            onPress={() => {
              navigation.navigate('Model', {
                model: model,
                instructions: instructions,
              });
            }}
          >
            {model.furniture_name}
          </Button>
        ),
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, link)
      );
      // If model is not found then negative responce is saved in messages useState.
    } else {
      const msg = BotResponse({
        text: `There is no model named ${userInput.toUpperCase()}. Try again!`,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg)
      );
    }
    // Returns the options again, with a different greeting
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
      case 'info':
        botResponseText = 'Sure! Please provide me with a model name.';
        setInfoExpected(true);
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
