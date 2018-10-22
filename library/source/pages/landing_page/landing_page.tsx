import {css, StyleSheet} from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import {HBoxLayout, Padding, VBoxLayout} from '../../layouts';

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
}

interface State {
  redirect: string;
  breakPoint: Breakpoint;
  isNameValid: boolean;
  nameValue: string;
}

/** Displays the Sudoku landing page. */
export class LandingPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      redirect: '',
      breakPoint: Breakpoint.LARGE,
      isNameValid: true,
      nameValue: ''
    };
    this.onPlayNow = this.onPlayNow.bind(this);
    this.onSeeStandings = this.onSeeStandings.bind(this);
    this.onResize = this.onResize.bind(this);
    this.getName = this.getName.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public getName(): string {
    return this.state.nameValue;
    if(this.nameInput) {
      return this.state.nameValue;
    } else {
      return 'Hauler';
    }
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    }
    const topPadding = (() => {
      switch(this.state.breakPoint) {
        case Breakpoint.SMALL:
          return undefined;
        case Breakpoint.MEDIUM:
          return '150px';
        case Breakpoint.LARGE:
          return '220px';
      }
    })();
    const bottomPadding = (() => {
      switch(this.state.breakPoint) {
        case Breakpoint.SMALL:
          return undefined;
        case Breakpoint.MEDIUM:
          return '40px';
        case Breakpoint.LARGE:
          return '40px';
      }
    })();
    const nameInputStyle = (() => {
      if(this.state.isNameValid) {
        return LandingPage.NAME_INPUT_VALID_STYLE.input;
      } else {
        return LandingPage.NAME_INPUT_INVALID_STYLE.input;
      }
    })();
    const errorMessageStyle = (() => {
      if(this.state.isNameValid) {
        return LandingPage.NAME_INPUT_VALID_STYLE.div;
      } else {
        return LandingPage.NAME_INPUT_INVALID_STYLE.div;
      }
    })();
    return (
      <HBoxLayout height='100%' width='100%' style={LandingPage.SCROLL_STYLE}>
        <Padding/>
        <VBoxLayout width='200px'>
          <Padding size={topPadding}/>
          <div>
            <img src = 'resources/images/landing_page/sudoku.svg'
              width='200px' height='100px'/>
          </div>
          <Padding size='10px'/>
          <div style={LandingPage.SUBHEADING_STYLE}>
            DESIGNED AND DEVELOPED BY SPIRE
          </div>
          <Padding size='60px'/>
          <div style={LandingPage.NAME_BOX_LABEL_STYLE}>YOUR NAME</div>
          <Padding size='8px'/>
          <input placeholder = 'Max. of 10 Characters'
            type='text' maxLength={10}
            className={css(LandingPage.NAME_INPUT_DEFAULT_STYLE.input,
              nameInputStyle)}
              value = {this.state.nameValue}
              onChange = {this.onInputChange}
            ref={(e) => this.nameInput = e}/>
          <div className={css(LandingPage.NAME_INPUT_DEFAULT_STYLE.div,
              errorMessageStyle)}>
            Name is required.
          </div>
          <div>
            <button onClick={this.onPlayNow}
                className={css(LandingPage.BUTTON_STYLE.button)}>
              PLAY NOW
            </button>
          </div>
          <Padding size='18px'/>
          <a tabIndex={0}
              onClick={this.onSeeStandings}
              style={LandingPage.STANDINGS_LINK_STYLE}>
            See Standings
          </a>
          <Padding size={bottomPadding}/>
        </VBoxLayout>
      <Padding/>
    </HBoxLayout>);
  }

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    console.log('Landing_Page unmounted');
    console.log('name was: ' + this.getName());
  }

  private onInputChange(event: any) {
    this.setState({nameValue: event.target.value});
  }

  private onPlayNow() {
    if(this.nameInput.value === '') {
      this.setState({isNameValid: false});
    } else {
      console.log('name was: ' + this.getName());
      this.setState({nameValue: this.getName()});
      this.setState({redirect: this.props.gameUrl});
    }
  }

  private onSeeStandings() {
    this.setState({redirect: this.props.standingsUrl});
  }

  private onResize() {
    if(document.body.clientWidth >= 1040) {
      if(this.state.breakPoint !== Breakpoint.LARGE) {
        this.setState({breakPoint: Breakpoint.LARGE});
      }
    } else if(document.body.clientWidth >= 560) {
      if(this.state.breakPoint !== Breakpoint.MEDIUM) {
        this.setState({breakPoint: Breakpoint.MEDIUM});
      }
    } else {
      if(this.state.breakPoint !== Breakpoint.SMALL) {
        this.setState({breakPoint: Breakpoint.SMALL});
      }
    }
  }

  private static readonly SCROLL_STYLE = {
    overflowY: 'auto' as 'auto'
  };
  private static readonly SUBHEADING_STYLE = {
    color: '#4B23A0',
    fontSize: '10px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center',
    cursor: 'default' as 'default'
  };
  private static readonly NAME_BOX_LABEL_STYLE = {
    color: '#333333',
    fontSize: '12px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center',
    cursor: 'default' as 'default'
  };
  private static readonly STANDINGS_LINK_STYLE = {
    color: '#333333',
    fontSize: '14px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center',
    textDecoration: 'none ' as 'none',
    cursor: 'pointer' as 'pointer'
  };
  private static readonly BUTTON_STYLE = StyleSheet.create({
    button: {
      height: '56px',
      width: '100%',
      boxSizing: 'border-box' as 'border-box',
      border: '1px solid #4B23A0',
      borderRadius: '4px',
      fontFamily: 'Roboto',
      fontSize: '20px',
      textAlign: 'center' as 'center',
      color: '#4B23A0',
      background: '#FFFFFF',
      cursor: 'pointer' as 'pointer',
      ':focus': {
        background: '#F2F2FF',
        color: '4B23A0'
      },
      ':hover': {
        background: '#4B23A0',
        color: '#F2F2FF'
      },
      ':active':{
        background: '#4B23A0',
        color: '#F2F2FF'
      }
    }
  });
  private static readonly NAME_INPUT_DEFAULT_STYLE = StyleSheet.create({
    input: {
      height: '40px',
      padding: '11px',
      boxSizing: 'border-box'  as 'border-box',
      border: '1px solid #4B23A0',
      borderRadius: '4px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      textAlign: 'left' as 'left',
      color: '#333333',
      '::placeholder': {
        color: 'transparent',
        visibility: 'hidden',
        fontFamily: 'Roboto',
        fontSize: '16px'
      }
    },
    div: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      boxSizing: 'border-box' as 'border-box',
      minHeight: '40px',
      textAlign: 'center' as 'center'
    }
  });
  private static readonly NAME_INPUT_VALID_STYLE = StyleSheet.create({
    input:{
      border: '1px solid #A0A0A0',
      ':focus': {
        border: '1px solid #4B23A0',
        '::placeholder': {
          color: '#0A0A0A',
          visibility: 'visible',
          fontFamily: 'Roboto',
          fontSize: '16px'
          }
      }
    },
    div:{
      visibility: 'hidden',
      color: 'transparent'
    }
  });
  private static readonly NAME_INPUT_INVALID_STYLE = StyleSheet.create({
    input:{
      border: '1px solid #E63F44'
    },
    div:{
      paddingTop: '8px',
      paddingBottom: '19px',
      visibility: 'visible',
      color: '#E63F44'
    }
  });
  private nameInput: HTMLInputElement;
}
