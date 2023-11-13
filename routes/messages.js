import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import { fetchInstructions, fetchModels } from '../components/api';
import { useNavigation } from '@react-navigation/native';

export default function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [descriptionExpected, setDescriptionExpected] = useState(false);
  const [instructionExpected, setInstructionExpected] = useState(false);
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
    setMessages([props.initialMessage]);
  }, []);

  // Reusable bot responce function
  const botResponse = (text) => {
    const responce = {
      _id: uuid.v4(),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 'chatbot',
        name: 'Chatbot',
      },
    };
    return responce;
  };

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
    // If the furniture model is found with the name given by the user,
    // the description of the model is saved in the messages useState.
    if (model) {
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(
            `Description of ${model.furniture_name} model: \n\n${model.furniture_description}`
          )
        )
      );
      // If model is not found then negative responce is saved in messages useState.
    } else {
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(`There is no model named ${userInput}. Try again!`)
        )
      );
    }
    // Returns the options again, with a different greeting
    // id and time (doesn't matter if info is found or not).
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, props.initialMessage2)
    );
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
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(`There is no model named ${userInput}. Try again!`)
        )
      );
      // If model is outdoor, then this instructions will be sent to a user.
    } else if (model.outdoor === true) {
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(getInstruction('Outdoor'))
        )
      );
      // If model has leather materials in it, then this instructions is returned.
    } else if (model.leather === true) {
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(
            // BUG for some reason can't insert new line
            `${getInstruction('Elmo leather')}\n\n${getInstruction(
              'Vegetable tanned leather'
            )}`
          )
        )
      );
      // If model lacks any of the above, then user is provided
      // with general care instructions.
    } else {
      setMessages((previousMessages) =>
        GiftedChat.append(
          previousMessages,
          botResponse(getInstruction('General'))
        )
      );
    }
    // Returns the options again, with a different greeting
    // id and time (doesn't matter if info is found or not).
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, props.initialMessage2)
    );
  };

  // chosen option turns into user's message and shows up on screen
  const simulateUserMessage = (selectedOption) => {
    const userMessage = {
      _id: uuid.v4(),
      text: selectedOption.title,
      createdAt: new Date(),
      user: {
        _id: 'user',
        name: 'User',
      },
    };
    // normal flow of the chat
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, userMessage)
    );
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
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, botResponse(botResponseText))
    );
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
