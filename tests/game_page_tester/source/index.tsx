import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';
import { BoardView } from '../../../library/source/pages/game_page/board_view';

const board = sudoku.generateBoard();
ReactDOM.render( <div>

<sudoku.BoardView board={sudoku.generateIncompleteBoard(50)}
                hasEffects={true}
                displayMode={BoardView.DisplaySize.SMALL}
                />
<sudoku.BoardView board={sudoku.generateIncompleteBoard(50)}
                hasEffects={true}
                displayMode={BoardView.DisplaySize.LARGE}
                />
                </div>,
                document.getElementById('main'));
