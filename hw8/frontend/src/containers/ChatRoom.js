import styled from 'styled-components';
import {useState, useEffect, useRef} from "react";
import {Input, Tabs} from 'antd'
import {useChat} from './hooks/useChat';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)` 
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`
const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  const {me, messages, displayStatus, sendMessage, startChat, clearMessages, setFriend} = useChat();
  const [msgSent, setMsgSent] = useState(false);
  
  const msgFooter = useRef(null);
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
  };
  
  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState(''); 
  const [modalOpen, setModalOpen] = useState(false);
  
  const renderChat = (genFooter, chat) => ( // OK
    <>
      {chat.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
          chat.map(({ sender, body }, i) => (
            <Message isMe={sender === me} message={body} key={i}/>
          ))
        )
      }
      {genFooter? <FootRef ref={msgFooter}></FootRef>:<></>}
    </>
  );

  const createChatBox = (friend) => {
    if (chatBoxes.some(({key}) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    startChat({ 
      variables: {
          name1: me,
          name2: friend,
      },
    });

    const chat = renderChat(true, messages.filter(({sender, body}) => ((sender === friend) || (sender === me))));
    setChatBoxes([ ...chatBoxes, { label: friend, children: chat, key: friend }]);
    console.log(`Frontend ChatBox with ${friend} is created.`);
  };

const removeChatBox = (targetKey, activeKey) => {
  const index = chatBoxes.findIndex(({key}) => key === activeKey);
  const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
  setChatBoxes(newChatBoxes);
  const newActiveKey = 
    (newChatBoxes.length !== 0)?
      (activeKey === targetKey)?
        (index === 0)?
          chatBoxes[index+1].key:chatBoxes[index-1].key  
      :activeKey
    :'' ;
  return newActiveKey;
};

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  const removeFootRef = (keyToRemove) => {
    const index = chatBoxes.findIndex(({key}) => key === keyToRemove);
    const chat = renderChat(false, messages.filter(({sender, body}) => ((sender === activeKey) || (sender === me))));
    const tempChatBoxes = [...chatBoxes];
    tempChatBoxes[index].children = chat;
    setChatBoxes(tempChatBoxes);
  }
  useEffect(() => {
    if (activeKey !== '') {
      console.log(`Currently chatting with activekey: ${activeKey}.`);
      const index = chatBoxes.findIndex(({key}) => key === activeKey);
      const chat = renderChat(true, messages.filter(({sender, body}) => ((sender === activeKey) || (sender === me))));
      const tempChatBoxes = [...chatBoxes];
      tempChatBoxes[index].children = chat;
      setChatBoxes(tempChatBoxes);
      setMsgSent(true); // To trigger scrolling down
    }
  }, [messages]);

  return (
    <>
      <Title name={me} />
      {/*console.log("Current chatBoxes:", chatBoxes)*/}
      <ChatBoxesWrapper
        type="editable-card"
        onChange={ (key) => {
          removeFootRef(activeKey);
          setActiveKey(key);
          setFriend(key);
          startChat({
            variables: {
                name1: me,
                name2: key,
            },
          });
        }}
        activeKey={activeKey}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            removeFootRef(activeKey);
            const newActiveKey = removeChatBox(targetKey, activeKey);
            setActiveKey(newActiveKey);
            setFriend(newActiveKey);
            startChat({
              variables: {
                  name1: me,
                  name2: newActiveKey,
              },
            });
          }
        }}
        items={chatBoxes}
      >
        
      </ChatBoxesWrapper>
      
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          const index = chatBoxes.findIndex(({key}) => key === name);
          if (index === -1) {
            if (activeKey !== '')  removeFootRef(activeKey)
            createChatBox(name);
            setActiveKey(name);
            setFriend(name);
          }
          else {
            const newActiveKey = chatBoxes[index].key;
            setActiveKey(newActiveKey);
            setFriend(newActiveKey);
            startChat({
              variables: {
                  name1: me,
                  name2: newActiveKey,
              },
            });
          }
          
          setModalOpen(false);
        }}
        onCancel={() => { setModalOpen(false);}}
      />
      {chatBoxes.length? <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            });
            return;
          }
          sendMessage({ variables: {name: me, to: activeKey, body: msg} });
          displayStatus({
            type: 'success',
            msg: 'Message sent.'
          });
          setBody('');
          setMsgSent(true);
        }}
        placeholder="Type a message here..."
      ></Input.Search>:<></>}
      
    </>
    
  );
}
export default ChatRoom;