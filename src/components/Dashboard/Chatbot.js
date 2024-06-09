import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Import your CSS file for styling
import axios from 'axios';
import Loader from '../loader/loader';
import CryptoJS from 'crypto-js';

export const processMessageToChatGPT = async (chatMessages, API_KEY) => {
    const apiMessages = chatMessages.map((messageObject) => {
      
        return {
            parts: [
                {
                    text: messageObject.message
                }
            ],
            role: "user"
        };
    });

    

    const apiRequestBody = {
        contents: [...apiMessages]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });
        const data = await response.json();
        console.log(data);
        return data.candidates[0].content.parts[0].text || "No response received";
    } catch (error) {
        console.error("API request error:", error);
        throw new Error("An error occurred during the API request.");
    }
};

export const decryptData = (encryptedData) => {
    const retrivedKey = encryptedData.substring(5,44);
   
      return retrivedKey;
  };

function Chatbot() {
    const [isLoading, setIsLoading] = useState(false);
    const [API_KEY, SET_API_KEY] = useState("");

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Hello!! I am your Personal Assistant ... You can ask me anything that you feel \" I am confused \".. I will provide my best information and promise you that you will understand better !",
            sender: "ChatGPT"
        }
    ]);

    const chatbotMessagesRef = useRef(null);

    

    useEffect(() => {
        getOpenAiKey();
        if (chatbotMessagesRef.current) {
            chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const getOpenAiKey = async () => {
        try {
            const API_KEY_RESPONSE = await axios.get(`https://learning-server-olive.vercel.app/keys/getBardKey`);
            const { encryptedData} = API_KEY_RESPONSE.data;
            const key = decryptData(encryptedData);
            SET_API_KEY(key);
        } catch (error) {
            console.error("Error getting API key:", error);
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        const newMessage = {
            message: input,
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setInput('');

        try {
            const responseMessage = await processMessageToChatGPT(newMessages, API_KEY);
            const chatGptResponse = {
                message: responseMessage,
                sender: "ChatGPT"
            };
            const updatedMessages = [...newMessages, chatGptResponse];
            setMessages(updatedMessages);
        } catch (error) {
            const chatGptResponse = {
                message: "Unable to Process your request at that time ! Try again later",
                sender: "ChatGPT"
            };
            const updatedMessages = [...newMessages, chatGptResponse];
            setMessages(updatedMessages);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="chatbot-container">
                <div className="chatbot">
                    <div className="chatbot-messages" ref={chatbotMessagesRef}>
                        {messages.map((message, index) => {
                            return (
                                <div className={message.sender === "ChatGPT" ? 'assistant-message' : 'user-message'} key={index}>
                                    {message.message.split('\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input type="text" placeholder="Type your message..." value={input} onChange={handleChange} />
                        <button className="send-button" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chatbot;
