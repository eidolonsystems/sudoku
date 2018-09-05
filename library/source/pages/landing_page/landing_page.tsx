import * as React from 'react';
import * as Router from 'react-router-dom';
import {VBoxLayout, HBoxLayout, Padding} from '../../layouts';

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
      breakPoint: Breakpoint.SMALL
    };
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    }
    return (
      <HBoxLayout height='100%' width='100%'>
        <Padding/>
        <VBoxLayout>
          <Padding/>
          <div>
            <img src = 'resources/images/landing_page/sudoku.svg'
              width='200px' height='100px'/>
          </div>
          <Padding size='10px'/>
          <div style={LandingPage.SUBHEADING_STYLE}>
            DESIGNED AND DEVELOPED BY SPIRE
          </div>
          <Padding size='60px'/>
          <div style={LandingPage.NAME_STYLE}>YOUR NAME</div>
          <Padding size='8px'/>
          <input type='text' style={LandingPage.NAME_INPUT_STYLE}/> 
          <Padding size='40px'/>
          <div>
            <button style={LandingPage.BUTTON_STYLE}>
              PLAY NOW</button>
          </div>
          <Padding size='40px'/>
          <div style={LandingPage.STANDINGS_STYLE}>See Standings</div>
          <Padding/>
        </VBoxLayout>
      <Padding/>
    </HBoxLayout>);
  }

  private static readonly SUBHEADING_STYLE = {
    color: '#4B23A0',
    fontSize: '10px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center'
  };

  private static readonly NAME_STYLE = {
    color: '#333333',
    fontSize: '12px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center'
  };

  private static readonly STANDINGS_STYLE = {
    color: '#333333',
    fontSize: '14px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center'
  };

  private static readonly BUTTON_STYLE = {
    height: '56px',
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
    border: '1px solid #4B23A0',
    borderRadius: '4px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    textAlign: 'center' as 'center',
    color: '#4B23A0'
  };

  private static readonly NAME_INPUT_STYLE = {
    height: '40px',
    padding: '11px',
    boxSizing: 'border-box' as 'border-box',
    border: '1px solid #4B23A0',
    borderRadius: '4px',
    fontFamily: 'Roboto',
    fontSize: '16px',
    textAlign: 'left' as 'left',
    color: '#333333'
  };
}
