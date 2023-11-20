import React from 'react';
import uuid from 'react-native-uuid';
import Messages from '../components/Messages';

export default function ChatBot() {

  const initialMessage = {
    _id: uuid.v4(),
    text: 'Welcome to the chatbot! How can I help you?',
    createdAt: new Date(),
    user: {
      _id: 'chatbot',
      name: 'Chatbot',
    },
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: [
        {
          title: 'Help me identify a piece of furniture',
          value: 'camera',
        },
        {
          title: 'Give me cleaning/care tips for my furniture model',
          value: 'instructions',
        },
        {
          title: 'Give me info about the furniture by model name',
          value: 'info',
        },
      ],
    },
  };

  const initialMessage2 = {
    _id: uuid.v4(),
    text: 'Do you need help with anything else?',
    createdAt: new Date(),
    user: {
      _id: 'chatbot',
      name: 'Chatbot',
    },
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: [
        {
          title: 'Help me identify a piece of furniture',
          value: 'camera',
        },
        {
          title: 'Give me cleaning/care tips for my furniture model',
          value: 'instructions',
        },
        {
          title: 'Give me info about the furniture by model name',
          value: 'info',
        },
      ],
    },
  };

  return (
    <Messages initialMessage={initialMessage} initialMessage2={initialMessage2}/>
  )
}