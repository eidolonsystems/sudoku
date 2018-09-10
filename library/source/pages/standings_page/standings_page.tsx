import * as React from 'react';
import * as Router from 'react-router-dom';
import {StandingsModel} from '.';

interface Properties {

  /** The standings model to display. */
  model: StandingsModel;

  /** The URL to redirect to when leaving the page. */
  exitUrl: string;
};

enum Breakpoint {

  /** Page is between 0 and 559 pixels (inclusive). */
  SMALL,

  /** Page is between 560 and 1039 pixels (inclusive). */
  MEDIUM,

  /** Page is equal or greater than 1040 pixels. */
  LARGE
};

interface State {
  isLoading: boolean;
  redirect: string;
  breakpoint: Breakpoint;
};

export class StandingsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoading: true,
      redirect: null,
      breakpoint: Breakpoint.LARGE
    };
  }

  public componentWillMount(): void {
    this.props.model.load().then(
      () => {
        this.setState({
          isLoading: false,
          breakpoint: Breakpoint.LARGE
        });
      });
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    } else if(this.state.isLoading) {
      return <div/>;
    }
    return <div>Standings Page!</div>;
  }
}
