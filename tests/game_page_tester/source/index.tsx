import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

ReactDOM.render(
  <div>
    <sudoku.HBoxLayout width = '100%' height = '100%'>
      <sudoku.Padding/>
      <div> There should be a game page here, but there isn't.</div>
      <sudoku.Padding/>
    </sudoku.HBoxLayout>
  </div>,
  document.getElementById('main'));
