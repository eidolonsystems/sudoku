import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as sudoku from 'sudoku';

const standings = new Array<sudoku.StandingEntry>();
standings.push({
  rank: 1,
  name: 'Tyrion',
  time: 100});
const model = new sudoku.LocalStandingsModel(standings, 1000);
ReactDOM.render(<sudoku.StandingsPage model={model} exitUrl='about:blank'/>,
  document.getElementById('main'));
