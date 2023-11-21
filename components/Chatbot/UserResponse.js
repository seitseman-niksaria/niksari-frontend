import uuid from 'react-native-uuid';

// This is reusable user simulated message response component.
const UserResponse = ({ text }) => {
  const msg = {
    _id: uuid.v4(),
    text: text,
    createdAt: new Date(),
    user: {
      _id: 'user',
      name: 'User',
    },
  };
  return msg;
};

export default UserResponse;
