import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';


const board = sudoku.generateIncompleteBoard(30);
ReactDOM.render(
  <div>
    <sudoku.HBoxLayout width = '100%' height = '100%'>
      <sudoku.Padding/>
      <sudoku.GameController initialBoard={board} username='Lucky'/>
      <sudoku.Padding/>
    </sudoku.HBoxLayout>
  </div>,
  document.getElementById('main'));
