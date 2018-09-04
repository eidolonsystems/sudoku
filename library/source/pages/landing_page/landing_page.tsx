import * as React from 'react';
import * as Router from 'react-router-dom';

/** Specifies the React properties for the landing page. */
interface Properties {

  /** The URL to play the game. */
  gameUrl: string;

  /** The URL to view standings. */
  standingsUrl: string;
}

enum Breakpoint {
  SMALL,
  MEDIUM,
  LARGE
};

interface State {
  redirect: string;
  breakPoint: Breakpoint;
};

/** Displays the Sudoku landing page. */
export class LandingPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      redirect: '',
      breakPoint: Breakpoint.SMALL,
    };
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    }
    return <div>Hello World!</div>;
  }
}
