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
const model = new sudoku.LocalStandingsModel(standings, 1000);

/** The main entry point to the React application. */
class Application extends React.Component {
  public render(): JSX.Element {
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
                model={model}
                exitUrl='/'
              />;
            }}/>
          <Router.Route exact path='/game'
            render={() => {
              return <sudoku.GamePage
                initialBoard={sudoku.generateIncompleteBoard(30)}
                username={this.landingPage.getName()}
              />;
            }}/>
        </Router.Switch>
      </Router.HashRouter>);
  }
  private landingPage: sudoku.LandingPage;
}

ReactDOM.render(<Application/>, document.getElementById('main'));
