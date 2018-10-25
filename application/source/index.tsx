import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as sudoku from 'sudoku';

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
const standingsModel = new sudoku.LocalStandingsModel(standings, 1000);

/** The main entry point to the React application. */
class Application extends React.Component {
  public render(): JSX.Element {
    return (
      <Router.HashRouter>
        <Router.Switch>
          <Router.Route exact path='/'
            render={() => {
              this.previousPath = '/';
              return <sudoku.LandingPage gameUrl='/game'
                standingsUrl='/standings'
                ref={(e) => this.landingPage = e}/>;
            }} />
          <Router.Route exact path='/standings'
            render={() => {
              return <sudoku.StandingsPage
                model={standingsModel}
                exitUrl={this.previousPath ? this.previousPath : '/'}/>;
            }}/>
          <Router.Route exact path='/game'
            render={() => {
              this.previousPath = '/game';
              if(this.landingPage) {
              this.gameModel  =  new sudoku.LocalGameModel(
                this.landingPage.getName(),
                Date.now(),
                sudoku.generateIncompleteBoard(30));
              }
              return <sudoku.GamePage
                model={this.gameModel}
                exitUrl={'/'}
                standingsUrl={'/standings'}
                />;
            }}/>
        </Router.Switch>
      </Router.HashRouter>);
  }

  private landingPage: sudoku.LandingPage;
  private gameModel: sudoku.LocalGameModel;
  private previousPath: string;
}

ReactDOM.render(<Application/>, document.getElementById('main'));
