/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';

const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    //console.log(letters, "p");
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {[1, 1, 1, 1, 1].map((num, index)=>{return (index <= letters.length - 1)? 
                    <div 
                        id={`${rowIdx}-${index}`} 
                        key={`${rowIdx}-${index}`} 
                        className={`Row-wordbox filled`}
                    >{letters[index]}</div>:
                    <div 
                        id={`${rowIdx}-${index}`} 
                        key={`${rowIdx}-${index}`} 
                        className={`Row-wordbox`}
                    ></div>
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
