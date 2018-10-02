import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

const board = sudoku.generateBoard();
board.set(0, 0, 0);
board.set(5, 5, 0);
board.set(2, 0, 0);
board.set(0, 7, 0);
ReactDOM.render(
  <div>
    <sudoku.HBoxLayout>
      <sudoku.GameController initialBoard={board}
        displayMode={sudoku.GameController.Mode.LARGE} />
      <sudoku.GameController initialBoard={board}
        displayMode={sudoku.GameController.Mode.SMALL} />
    </sudoku.HBoxLayout>
  </div>,
  document.getElementById('main'));
