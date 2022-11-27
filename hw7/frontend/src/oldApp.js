import './App.css';
import { useState, useEffect, useRef } from "react";
import { Button, Input, message, Tag } from 'antd'
import useChat from './containers/hooks/useChat';

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
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
  useEffect(() => {displayStatus(status)}, [status]);
  const bodyRef = useRef(null);
  return (

    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
          ) : (
            messages.map(({ name, body }, i) => (
              <p className="App-message" key={i}>
                <Tag color="blue">{name}</Tag> {body}
              </p>
            ))
          )}
      </div>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus();
          }}
        }
        placeholder="Username"
        style={{ marginBottom: 10 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            });
            return;
          }
          sendMessage({name: username, body: msg});
          setBody('');
        }}
        placeholder="Type a message here..."
      ></Input.Search>
    </div>
  )
}

export default App;
