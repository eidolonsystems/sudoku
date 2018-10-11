import * as React from 'react';
import { Padding, VBoxLayout } from '../../layouts';

/** Lists the side menu items. */
enum SideMenuItem {

  /** Create a new game. */
  NEW_GAME,

  /** Display the standings page. */
  STANDINGS,

  /** Display the about page. */
  ABOUT,

  /** Exit the game. */
  EXIT
}

interface Properties {

  /** The on-click handler. */
  onClick(item: SideMenuItem): void;
  /*
  A function of type (e: CustomEvent) => void is no longer considered 
  to be a valid instance of EventListener, which takes an Event parameter, 
  not a CustomEvent.
  */
}

interface State {
  isMenuOpen: boolean;
}

/** Displays the game page's side menu. */
export class SideMenu extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  public render(): JSX.Element {
    const visibility = (() => {
      if(this.state.isMenuOpen) {
        return SideMenu.CONTAINER_STYLE.visible;
      } else {
        return SideMenu.CONTAINER_STYLE.hidden;
      }
    })();
    const hamburgerButtonPositon = (() => {
      if(this.state.isMenuOpen) {
        return SideMenu.MENU_BUTTON_PLACEMENT.menuOpen;
      } else {
        return SideMenu.MENU_BUTTON_PLACEMENT.menuClosed;
      }
    })();
    return (
      <div>
        <div style={visibility}>
          <img src='resources/images/landing_page/sudoku.svg'
            style={SideMenu.LOGO_STYLE} />
          <a
            onClick={() => this.props.onClick(SideMenuItem.NEW_GAME)}
            style={SideMenu.TEXT_STYLE}>
            New Game
        </a>
          <a
            onClick={() => this.props.onClick(SideMenuItem.STANDINGS)}
            style={SideMenu.TEXT_STYLE}>
            See Standings
        </a>
          <a // I never made a about page? Should maybe be removed.
            onClick={() => this.props.onClick(SideMenuItem.ABOUT)}
            style={SideMenu.TEXT_STYLE}>
            About
        </a>
          <a
            onClick={() => this.props.onClick(SideMenuItem.EXIT)}
            style={SideMenu.TEXT_STYLE}>
            Exit
        </a>
        </ div>
        <input type='image'
          onClick={this.changeVisibility}
          width='20px' height='16px'
          style={hamburgerButtonPositon}
          src='resources/images/game_page/burger-purple.svg' />
      </div>
    );
  }

  private changeVisibility() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  private static readonly CONTAINER_STYLE = {
    visible: {
      backgroundColor: '#FFFFFF', //change to white!!!!
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      boxSizing: 'border-box' as 'border-box',
      position: 'fixed' as 'fixed',
      width: '200px', //uh, but 
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      paddingLeft: '17px',
      borderRight: '1px solid #EBEBEB'
    },
    hidden: {
      display: 'none' as 'none'
    }
  };
  private static readonly LOGO_STYLE = {
    width: '80px',
    height: '40px',
    marginTop: '20px'
    //add hover stuff BLAGHFGHFGHSDF
  };
  private static readonly TEXT_STYLE = {
    fontSize: '16px',
    height: '20px',
    color: '#000000',
    fontFamily: 'Roboto',
    marginTop: '20px',
    topLink: {
      marginTop: '40px'
    },
    bottomLink: {
      marginBotom: '40px'
    }
    //add focus
    //add on click and on hoooover
  };
  private static readonly MENU_BUTTON_PLACEMENT = {
    menuClosed: {
      position: 'absolute' as 'absolute', //?????
      left: '17px',
      top: '20px'
    },
    menuOpen: {
      position: 'absolute' as 'absolute', //?????
      left: '217px',
      top: '20px'
    }
  };
}

export module SideMenu {
  export const Item = SideMenuItem;
}
