import uuid from 'react-native-uuid';

// Reusable bot response component. It can be used
// whenever you need a response on screen from the bot.
const BotResponse = ({ text }) => {
  const msg = {
    _id: uuid.v4(),
    text: text,
    createdAt: new Date(),
    user: {
      _id: 'chatbot',
      name: 'Chatbot',
    },
  };
  return msg;
};

export default BotResponse;
