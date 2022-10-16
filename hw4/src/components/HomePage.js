/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  //const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  /* Advanced TODO: Implementation of Difficult Adjustment. Some functions may be added here! */
  const showingPanel = () => {
    setShowPanel(!showPanel);
  }


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implement start button */}
      <button 
        className='btn'
        onClick={(mineNum > boardSize**2)?()=>{}:startGameOnClick}
        style={(mineNum > boardSize**2)? {opacity: 0.5}:{}}
      >
        Start Game
      </button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button
          className='btn'
          onClick={showingPanel}
        >
          Difficulty Adjustment
        </button>
        {showPanel &&
          <div className='controlWrapper'>
            {(mineNum > boardSize**2) && 
              <div className='error' style={{color:'#880000'}}>
                ERROR: Mine numbers and board size are invalid!
              </div>
            }
            <div className='controlPanel'>
              <div className='controlCol'>
                <p className='controlTitle'>Mines Number</p>
                <input 
                  id='MinesNumber'
                  type='range'
                  step='1'
                  min='1'
                  max={boardSize ** 2}
                  defaultValue='10'
                  onChange={mineNumOnChange}  
                />
                <p 
                  style={(mineNum > boardSize**2)? {color: '#880000'}:{color: '#0f0f4b'}} 
                  className='controlNum'
                >
                  {mineNum}
                </p>
              </div>
              <div className='controlCol'>
                <p className='controlTitle'>Board Size (Length of the side)</p>
                <input 
                  id='BoardSize'
                  type='range'
                  step='1'
                  min='2'
                  max='20'
                  defaultValue='8'
                  onChange={boardSizeOnChange}
                />
                <p 
                  style={(mineNum > boardSize**2)? {color: '#880000'}:{color: '#0f0f4b'}}
                  className='controlNum'
                >
                  {boardSize}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
      
    </div>
  );

}
export default HomePage;   