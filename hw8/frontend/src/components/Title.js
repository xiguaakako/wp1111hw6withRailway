import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h1 { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }`; // &h1?

const Title = ({name}) => (
  <Wrapper>
    <h1>
      {name? `${name}'s`: "My"} Chat Room
    </h1>
  </Wrapper>
);

export default Title;
