import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function Chatbot() {

    const [messages, setMessages] = useState([]);
    const [modelNameExpected, setModelNameExpected] = useState(false);

    // handle messages (e.g. when user gives model's name)
    const handleSendMessage = (newMessages = []) => {
        const message = newMessages[0];
        if (message) {
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, message)
            );
            if (modelNameExpected) {
                fetchDescription(message.text)
                setModelNameExpected(false)
            }
        }
    };

    // chosen option turns into user's message and shows up on screen
    const simulateUserMessage = (selectedOption) => {
        const userMessage = {
            _id: Math.round(Math.random() * 1000000),
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
        handleOptionSelected(selectedOption)
    }

    // fetch specific furniture's description
    const fetchDescription = (modelName) => {
        fetch('http://127.0.0.1:8000/furniture-models/')
            .then((response) => response.json())
            .then((responseData) => {
                // find the first matching furniture by name
                const furnitureInfo = responseData.find((furniture) => furniture.furniture_name === modelName.toUpperCase());
                if (furnitureInfo) {
                    // extract the description from the matching furniture
                    const furnitureDescription = furnitureInfo.furniture_description;
                    const botInfoResponse = {
                        _id: Math.round(Math.random() * 1000000),
                        text: furnitureDescription,
                        createdAt: new Date(),
                        user: {
                            _id: 'chatbot',
                            name: 'Chatbot'
                        }
                    };
                    setMessages((previousMessages) =>
                        GiftedChat.append(previousMessages, botInfoResponse));
                // if no matching furniture is found, "no info available"
                } else {
                    const botInfoResponse = {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'No info available',
                        createdAt: new Date(),
                        user: {
                            _id: 'chatbot',
                            name: 'Chatbot'
                        }
                    };
                    setMessages((previousMessages) =>
                        GiftedChat.append(previousMessages, botInfoResponse));
                }
            })
            .catch((err) => console.error(err));
    };

    const handleOptionSelected = (selectedOption) => {
        let botResponseText = ''
        switch (selectedOption.value) {
            case 'camera':
                botResponseText = 'Sure! I will help you with identifying a furniture. Please provide me with a picture of the furniture';
                // add logic so user can take/choose a picture
                break
            case 'instructions':
                botResponseText = 'Sure! Please provide me with a model name.';
                // add logic for user input
                break;
            case 'info':
                botResponseText = 'Sure! Please provide me with a model name.';
                setModelNameExpected(true);
                handleSendMessage()
                break;
            default:
                botResponseText = 'I didn\'t understand your selection. Please try again.';
                break;
        }

        // chatbot's response
        const botResponse = {
            _id: Math.round(Math.random() * 1000000),
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

    useEffect(() => {
        // initial welcome message from the chatbot
        const initialMessage = {
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
        }
        // without this, initial message comes in twice
        setMessages([initialMessage])
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSendMessage}
            user={{
                _id: 'user',
                name: 'User',
            }}
            onQuickReply={(quickReply) => {
                simulateUserMessage(quickReply[0])
            }}
        />
    );
}