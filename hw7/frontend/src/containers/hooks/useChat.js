import { createContext, useContext, useState, useEffect } from "react";
import {message} from 'antd';
const client = new WebSocket('ws://localhost:4000');

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {},
    startChat: () => {}
});

// LRB
const LOCALSTORAGE_KEY = "save-me"; 
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    
    const [me, setMe] = useState(savedMe || "");
    
    
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                setMessages(() => [...messages, ...payload]);
                break; 
            }
            case "status": {
                setStatus(payload); 
                break;
            }
            case "init": {
                setMessages(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        };
    }
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const startChat = (name, to) => {
        sendData(['CHAT', {name, to}]);
    }
    const sendMessage = (payload) => {
        sendData(['MESSAGE', payload]);
    };
    const clearMessages = () => {
        sendData(['CLEAR']);
    };
    
    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg, sender } = s;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
                case 'message':
                    if (sender === me) message.success({content: msg.sender, duration: 0.5 });
                    else message.info({content: msg.receiver, duration: 0.5 });
                    break;
                case 'success':
                    message.success(content);
                    break;
                case 'info':
                    message.info(content);
                    break;
                default:
                    message.error(content);
                    break;
            }
        }
    }
    

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
            console.log(`User ${me} is storaged locally.`);
        }
    }, [me, signedIn]);

    return (
        <ChatContext.Provider
            value={{status, me, signedIn, messages, setMe, setSignedIn, sendMessage, clearMessages, displayStatus, startChat}}
            {...props}
        />
    );
};
const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };