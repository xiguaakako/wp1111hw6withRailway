import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";
import { createContext, useContext, useState, useEffect } from "react";
import {message} from 'antd';

const ChatContext = createContext({
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: () => {},
    startChat: () => {}
});

// LRB
const LOCALSTORAGE_KEY = "save-me"; 
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [signedIn, setSignedIn] = useState(false);
    
    const [me, setMe] = useState(savedMe || "");
    const [friend, setFriend] = useState("");

    const [startChat, { data: ChatBoxData } ] = useMutation(CREATE_CHATBOX_MUTATION);
    useEffect(() => {
        if (ChatBoxData !== undefined) setMessages(ChatBoxData.createChatBox.messages);
    }, [ChatBoxData])

    const [sendMessage, { data: messageData }] = useMutation(CREATE_MESSAGE_MUTATION);
    useEffect(() => {
        if (messageData !== undefined) setMessages([...messages, messageData.createMessage]);
    }, [messageData])
    
    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg, sender } = s;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
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
    const {data: messageSubData } = useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: {
            from: me,
            to : friend
        }
    });
    useEffect(() => {
        if (messageSubData !== undefined && messageSubData.message.sender !== me) setMessages([...messages, messageSubData.message]);
    }, [messageSubData])
    
    /*useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message.message;
                    return { chatBox: { messages: [...prev.chatBox.messages, newMessage],}, };
                },
            });
        } catch (e) {}
    }, [subscribeToMore]);*/

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
            console.log(`User ${me} is storaged locally.`);
        }
    }, [me, signedIn]);

    return (
        <ChatContext.Provider
            value={{me, signedIn, messages, setMe, setSignedIn, sendMessage, displayStatus, startChat, setFriend }}
        >
            {props.children}
        </ChatContext.Provider>   
        
    );
};
const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };