import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';
import { BoardView } from '../../../library/source/pages/game_page/board_view';

const board = sudoku.generateBoard();
board.set(0,0,0);
board.set(5,5,0);
board.set(2,0,0);
board.set(0,7,0);
ReactDOM.render( <div>

<sudoku.BoardView board={board}
                hasEffects={true}
                displayMode={BoardView.DisplaySize.SMALL}
                />
<sudoku.BoardView board={board}
                hasEffects={true}
                displayMode={BoardView.DisplaySize.LARGE}
                />
                </div>,
                document.getElementById('main'));
