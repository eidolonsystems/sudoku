import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

enum DisplayMode {

  /** Page is between 0 and 559 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

const board = sudoku.generateBoard();
ReactDOM.render(<sudoku.BoardView board={sudoku.generateIncompleteBoard(50)}
                hasEffects={true} />,
                document.getElementById('main'));
