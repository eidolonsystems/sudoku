import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

/** Lists the side menu items. */
enum SideMenuItem {

  /** Create a new game. */
  NEW_GAME,

  /** Display the standings page.        */
  STANDINGS,

  /** Display the about page. */
  ABOUT,

  /** Exit the game. */
  EXIT
}

interface Properties {

  /** The on-click handler. */
  onClick(item: SideMenuItem): void;
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
    const background = (() => {
      if(this.state.isMenuOpen) {
        return SideMenu.TINTED_OVERLAY_STYLE;
      } else {
        return null;
      }
    })();
    const hamburgerPositon = (() => {
      if(this.state.isMenuOpen) {
        return SideMenu.MENU_BUTTON.menuOpen;
      } else {
        return SideMenu.MENU_BUTTON.menuClosed;
      }
    })();
    return (
      <div z-index='5' style={background}>
        <input type='image'
          onClick={this.changeVisibility}
          width='20px' height='16px'
          className={css(SideMenu.MENU_BUTTON.base, hamburgerPositon)}
          src='resources/images/game_page/burger-purple.svg'/>
        <div style={{ ...visibility }} z-index={3}>
          <img src='resources/images/landing_page/sudoku.svg'
            style={SideMenu.LOGO_STYLE}/>
          <a tabIndex={1}
              className={css(SideMenu.TEXT_STYLE.base,
                SideMenu.TEXT_STYLE.topLink)}
              onClick={() => this.props.onClick(SideMenuItem.NEW_GAME)}>
            New Game
          </a>
          <a tabIndex={2}
              onClick={() => this.props.onClick(SideMenuItem.STANDINGS)}
              className={css(SideMenu.TEXT_STYLE.base)}>
            See Standings
          </a>
          <a tabIndex={3}
              onClick={() => this.props.onClick(SideMenuItem.ABOUT)}
              className={css(SideMenu.TEXT_STYLE.base)}>
            About
          </a>
          <a tabIndex={4}
              className={css(SideMenu.TEXT_STYLE.base,
                SideMenu.TEXT_STYLE.topLink)}
              onClick={() => this.props.onClick(SideMenuItem.EXIT)}>
            Exit
          </a>
        </div>
      </div>);
  }

  private changeVisibility() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  private static readonly TINTED_OVERLAY_STYLE = {
    position: 'fixed' as 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#70707046',
    width: '100%',
    height: '100%'
  };
  private static readonly CONTAINER_STYLE = {
    visible: {
      backgroundColor: '#FFFFFF',
      display: 'flex' as 'flex',
      flexDirection: 'column' as 'column',
      boxSizing: 'border-box' as 'border-box',
      position: 'fixed' as 'fixed',
      width: '200px',
      maxWidth: '200px',
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      paddingLeft: '17px',
      margin: '0'
    },
    hidden: {
      display: 'none' as 'none'
    }
  };
  private static readonly LOGO_STYLE = {
    width: '80px',
    height: '40px',
    marginTop: '20px'
  };
  private static readonly TEXT_STYLE = StyleSheet.create({
    base: {
      fontSize: '16px',
      height: '20px',
      color: '#000000',
      fontFamily: 'Roboto',
      marginTop: '20px',
      ':hover': {
        color: '#4B23A0'
      },
      ':focus': {
        color: '#4B23A0',
        outline: '0',
        textDecoration: 'underline'
      },
      '::-moz-focus-inner': {
        border: '0',
        textDecoration: 'underline'
      }
    },
    topLink: {
      marginTop: '40px'
    },
    bottomLink: {
      marginBotom: '40px'
    }
  });
  private static readonly MENU_BUTTON = StyleSheet.create({
    base: {
      borderRadius: '0px',
      ':focus': {
        cursor: 'default' as 'default',
        outline: '0',
        outlineColor: 'transparent',
        outlineCtyle: 'one'
      },
      '::-moz-focus-inner': {
        border: '0'
      }
    },
    menuClosed: {
      position: 'absolute' as 'absolute',
      left: '17px',
      top: '20px',
      ':focus': {
        outline: '0'
      }
    },
    menuOpen: {
      position: 'fixed' as 'fixed',
      left: '217px',
      top: '20px',
      ':focus': {
        outline: '0'
      }
    }
  });
}

export module SideMenu {
  export const Item = SideMenuItem;
}
