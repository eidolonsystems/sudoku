import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as sudoku from 'sudoku';
import { GameModel, LocalGameModel } from 'sudoku';

/** 
const standings = new Array<sudoku.StandingEntry>();
standings.push({
  rank: 1,
  name: 'Tyrion',
  time: 100});
standings.push({
  rank: 2,
  name: 'Mochi',
  time: 140});
standings.push({
  rank: 3,
  name: 'Miso',
  time: 140});
const model = new sudoku.LocalStandingsModel(standings, 1000);
*/

/** The main entry point to the React application. */
class Application extends React.Component {
  public render(): JSX.Element {

    console.log('current time! ' + Date.now());
    return (
      <Router.HashRouter>
        <Router.Switch>
          <Router.Route exact path='/'
            render={() => {
              return <sudoku.LandingPage gameUrl='/game'
                standingsUrl='/standings'
                ref={(e) => this.landingPage = e}/>;
            }} />
          <Router.Route exact path='/standings'
            render={() => {
              return <sudoku.StandingsPage
                model={null}
                exitUrl='/'/>;
            }}/>
          <Router.Route exact path='/game'
            render={() => {
              return <sudoku.GamePage
                ref = {(e) => this.gamePage = e}
                model = { this.gameModel =  new LocalGameModel(
                          this.landingPage.getName(),
                          Date.now(), //wrong > : I
                          sudoku.generateIncompleteBoard(30))}
              />;
            }}/>
        </Router.Switch>
      </Router.HashRouter>);
  }

  private landingPage: sudoku.LandingPage;
  private gamePage: sudoku.GamePage;
  private gameModel: sudoku.LocalGameModel;
}

ReactDOM.render(<Application/>, document.getElementById('main'));
