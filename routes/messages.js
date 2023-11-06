import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';

export default function Messages(props) {

  const [messages, setMessages] = useState([]);
  const [modelNameExpected, setModelNameExpected] = useState(false);
  const [furnitureModels, setFurnitureModels] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [missingData, setMissingData] = useState('');

  useEffect(() => {
    fetchModels();
    fetchInstructions();
    setMessages([props.initialMessage]);
  }, []);

  // fetch all avaible models
  const fetchModels = () => {
    fetch('http://10.0.2.2:8000/furniture-models/')
      .then((resp) => resp.json())
      .then((data) => {
        setFurnitureModels(data);
        if (data === null) {
          setMissingData('No furniture models avaible.');
        }
      })
      .catch((err) => console.error(err));
  };

  // fetch all avaible instructions
  const fetchInstructions = () => {
    fetch('http://10.0.2.2:8000/instructions/')
      .then((resp) => resp.json())
      .then((data) => {
        setInstructions(data);
        if (data === null) {
          setMissingData('No instructions avaible.');
        }
      })
      .catch((err) => console.error(err));
  };

  // function that handles user input sends
  const onSend = (messages = []) => {
    const msg = messages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (modelNameExpected) {
      furnitureInfo(msg.text);
      setModelNameExpected(false);
    }
  };

  // chatbot returns description of a furniture model by user input
  const furnitureInfo = (userInput) => {
    const model = furnitureModels.find(
      (furniture) => furniture.furniture_name === userInput.toUpperCase()
    );

    //if a furniture is found by the name user gave
    if (model) {
      const botResponse = {
        _id: uuid.v4(),
        text:
          `Description of ${model.furniture_name} model: \n\n${model.furniture_description}`,
        createdAt: new Date(),
        user: {
          _id: 'chatbot',
          name: 'Chatbot',
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botResponse)
      );
      // if no furniture by that name is found
    } else {
      const botResponse = {
        _id: uuid.v4(),
        text: 'No info available',
        createdAt: new Date(),
        user: {
          _id: 'chatbot',
          name: 'Chatbot',
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botResponse)
      );
    }
    // gives the options again, with a different greeting, id and time (doesn't matter if info is found or not)
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
        // add logic so user can take/choose a picture
        break;
      case 'instructions':
        botResponseText = 'Sure! Please provide me with a model name first.';
        break;
      case 'info':
        botResponseText = 'Sure! Please provide me with a model name.';
        setModelNameExpected(true);
        onSend();
        break;
      default:
        botResponseText =
          "I didn't understand your selection. Please try again.";
        break;
    }
    // chatbot's response
    const botResponse = {
      _id: uuid.v4(),
      text: botResponseText,
      createdAt: new Date(),
      user: {
        _id: 'chatbot',
        name: 'Chatbot',
      },
    };
    // update the chat messages with the bot's response
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, botResponse)
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