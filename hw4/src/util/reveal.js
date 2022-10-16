/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    

  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  if (!board[x][y].revealed){
    board[x][y].revealed = true;
    --newNonMinesCount;
  }
  if (board[x][y].value === 0){
    if (x >= 1 && !board[x-1][y].revealed){
      const new_reveal_output = revealed(board, x-1, y, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (x <= board.length-2 && !board[x+1][y].revealed) {
      const new_reveal_output = revealed(board, x+1, y, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (y >= 1 && !board[x][y-1].revealed ) {
      const new_reveal_output = revealed(board, x, y-1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (y <= board.length-2 && !board[x][y+1].revealed) {
      const new_reveal_output = revealed(board, x, y+1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (x >= 1 && y >= 1 && !board[x-1][y-1].revealed) {
      const new_reveal_output = revealed(board, x-1, y-1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (x >= 1 && y <= board.length-2 &&  !board[x-1][y+1].revealed) {
      const new_reveal_output = revealed(board, x-1, y+1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (x <= board.length-2 && y <= board.length-2 &&  !board[x+1][y+1].revealed) {
      const new_reveal_output = revealed(board, x+1, y+1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
      
    if (x <= board.length-2 && y >=1 &&  !board[x+1][y-1].revealed) {
      const new_reveal_output = revealed(board, x+1, y-1, newNonMinesCount);
      board = new_reveal_output.board;
      newNonMinesCount = new_reveal_output.newNonMinesCount;
    }
  } 
  return { board,  newNonMinesCount };  
};
