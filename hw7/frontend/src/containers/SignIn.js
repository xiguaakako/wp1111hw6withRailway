import {useChat} from './hooks/useChat';
import LogIn from '../components/Login';
import AppTitle from '../components/Title';

const SignIn = () => {
  const { me, setMe, setSignedIn, displayStatus } = useChat();
  const handleLogin = (name) => {
    if (!name)
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    else {
      console.log(`${name} has logged in succesfully.`)
      setSignedIn(true);
    }
  }
  return (
    <>
      <AppTitle />
      <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
}
export default SignIn;