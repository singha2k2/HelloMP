import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Import your CSS file for styling
import axios from 'axios';
import Loader from '../loader/loader';



export const processMessageToChatGPT = async (chatMessages,API_KEY) => {


    let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
        return {
            role: role,
            content: messageObject.message
        };
    });

    const systemMessage = {
        role: "system",
        content: "Explain all concepts as if I am 10 years old and if possible in one liner and very much consized manner"
    };

    // {
    //     "model": "phi3",
    //     "prompt": "Why is the sky blue?",
    //     "stream": false
    //   }
    const apiRequestBody = {
        "model": "phi3",
        "prompt": apiMessages.map(message => message.content).join("\n") + "\n" + systemMessage.content,
        "stream": false
    };

    try {
        const response = await fetch("http://localhost:11434/api/generate",{
            method: "POST",
            body: JSON.stringify(apiRequestBody),
        })
        const data = await response.json();
        console.log(data);
        return data.response;
    } catch (error) {
        console.error("API request error:", error);
        throw new Error("An error occurred during the API request.");
    }

    // try {
    //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Bearer ${API_KEY}`,
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(apiRequestBody)
    //     });

    //     const data = await response.json();

    //     return data.choices[0].message.content;
    // } catch (error) {
    //     console.error("API request error:", error);
    //     throw new Error("An error occurred during the API request.");
    // }
};


function Chatbot() {
    const [isLoading,setIsLoading] = useState(false);
    const [API_KEY,SET_API_KEY] = useState("");

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Hello!! I am your Personal Assistant ... You can ask me anything that you feel \" I am confused \".. I will provide my best information and promise you that you will understand better !",
            sender: "ChatGPT"
        }
    ]);

    const chatbotMessagesRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the messages container when messages change
        getOpenAiKey();
        if (chatbotMessagesRef.current) {
            chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const getOpenAiKey = async() => {
        const API_KEY_RESPONSE = await axios.get(`https://learning-server-olive.vercel.app/keys/openAiKey`) ;

        SET_API_KEY(API_KEY_RESPONSE.data.KeyId);
    }

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
            const responseMessage = await processMessageToChatGPT(newMessages,API_KEY);
            
            // Construct the new message object for ChatGPT's response
            const chatGptResponse = {
                message: responseMessage,
                sender: "ChatGPT"
            };
    
            // Add ChatGPT's response to the messages array
            const updatedMessages = [...newMessages, chatGptResponse];
            
            // Update state with the updated messages array
            setMessages(updatedMessages);
        } catch (error) {
            const chatGptResponse = {
                message: "Unable to Process your request at that time ! Try again later",
                sender: "ChatGPT"
            };
            const updatedMessages = [...newMessages, chatGptResponse];
            setMessages(updatedMessages);
            // Handle error if needed
        }
        finally{
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
                <div className="chatbot-input">
                    <input type="text" placeholder="Type your message..." value={input} onChange={handleChange} />
                    <button className="send-button" type="submit" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Chatbot;
