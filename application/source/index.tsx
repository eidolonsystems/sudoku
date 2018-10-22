import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';
import * as sudoku from 'sudoku';
import { userInfo } from 'os';

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
            }}/>
          <Router.Route exact path='/game'
            render={() => {
              return <sudoku.GamePage
              initialBoard = {sudoku.generateIncompleteBoard(30)}
              username = {'BLOOP'}
              />;
            }}/>
        </Router.Switch>
      </Router.HashRouter>);
  }
  private landingPage: sudoku.LandingPage;
}

ReactDOM.render(<Application/>, document.getElementById('main'));
