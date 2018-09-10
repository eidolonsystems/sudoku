import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as sudoku from 'sudoku';

ReactDOM.render(
  <Router.HashRouter>
    <sudoku.LandingPage gameUrl='about:blank' standingsUrl='about:blank'/>
  </Router.HashRouter>, 
  document.getElementById('main'));
