import { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  
  const handleInput = () => {
    setNumber(document.querySelector('input').value);
  }

  const handleGuess = async () => {
    const response = await guess(number);
    if (response === 'Equal') setHasWon(true);
    else {
      setStatus(response);
    }
  };

  const startMenu = 
    <div>
      <button 
        onClick = {() => {
          startGame();
          setHasStarted(true);
        }}
      > 
        start game
      </button>
    </div>;

const gameMode = 
  <>
    <p>Guess a number between 1 to 100</p>
    <input
      onChange={handleInput}
    ></input>
    <button
      onClick={handleGuess}
      disabled={!number}
    >
      guess!
    </button>
    <p>{status}</p>
  </>;
 
  const winningMode = //()?
    <>
      <p>you won! the number was {number}</p>
      <button
        onClick = {() => {
          setHasWon(false);
          setStatus('');
          restart();
        }}
      >
        restart
      </button>
    </>;
  
  const game = 
    <div>
      {hasWon? winningMode:gameMode}
    </div>;
  
  return (
    <div className='App'>
      {hasStarted? game:startMenu}
    </div>
  );
}

export default App;
