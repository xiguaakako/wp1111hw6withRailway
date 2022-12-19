import styled from 'styled-components';
import ChatRoom from './containers/ChatRoom';
import SignIn from './containers/SignIn';
import {useChat} from './containers/hooks/useChat';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const App = () => {
  const { signedIn } = useChat();
  //useEffect(() => {displayStatus(status)}, [status, displayStatus]);
  return (
    <Wrapper> 
      {signedIn? <ChatRoom />: <SignIn />}
    </Wrapper>
  );
}
export default App;