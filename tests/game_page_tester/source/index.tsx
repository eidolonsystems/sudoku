import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

const board = sudoku.generateBoard();
board.set(0, 0, 0);
board.set(5, 5, 0);
board.set(2, 0, 0);
board.set(6, 3, 0);
board.set(8, 7, 0);
board.set(0, 7, 0);
ReactDOM.render(
  <div>
    <sudoku.HBoxLayout width = '100%' height = '100%'>
      <sudoku.Padding/>
      <sudoku.GameController initialBoard={board}/>
      <sudoku.Padding/>
    </sudoku.HBoxLayout>
  </div>,
  document.getElementById('main'));
