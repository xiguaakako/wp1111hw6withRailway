/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';

const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                {guess.map((letter, index)=>{ return (letter.char !== '')?
                        <div 
                            id={`${rowIdx}-${index}`} 
                            key={`${rowIdx}-${index}`} 
                            className={`Row-wordbox ${letter.color}`}
                        >
                            {letter.char}
                        </div>:
                        <div 
                            id={`${rowIdx}-${index}`} 
                            key={`${rowIdx}-${index}`} 
                            className={`Row-wordbox`}
                        >
                        </div>
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;
