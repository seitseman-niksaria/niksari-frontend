import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);

    // handle messages
    const handleSendMessage = (newMessages = []) => {
        const message = newMessages[0];
        if (message) {
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, message)
            );
        }
    };

    useEffect(() => {
        // initial welcome message from the chatbot
        handleSendMessage([
            {
                _id: 1,
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
                            title: 'Give me cleaning/care tips by model name',
                            value: 'instructions',
                        },
                        {
                            title: 'Give me info about the furniture by model name',
                            value: 'info',
                        },
                    ],
                },
            },
        ]);
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSendMessage}
            user={{
                _id: 'user',
                name: 'User',
            }}
        />
    );
}
