import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

ReactDOM.render(<sudoku.LandingPage gameUrl='about:blank'
  standingsUrl='about:blank'/>, document.getElementById('main'));
