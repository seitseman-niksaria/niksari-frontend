import uuid from 'react-native-uuid';

// This is reusable bot question message component.
// It returns initial bot message and the following messages if needed.
const BotQuestion = ({ text }) => {
  const msg = {
    _id: uuid.v4(),
    text: text,
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
          title: 'Help me identify a piece of furniture with camera',
          value: 'camera',
        },
        {
          title: 'Give me info about the furniture by model name',
          value: 'info',
        },
      ],
    },
  };
  return msg;
};

export default BotQuestion;
